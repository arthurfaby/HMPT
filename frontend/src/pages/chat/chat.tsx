import { Spinner } from "@/components/ui/spinner";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { ChatDto } from "@/dtos/chat_dto";
import { MessageDto } from "@/dtos/message_dto";
import { UserDto } from "@/dtos/user_dto";
import { useAuth } from "@/hooks/useAuth";
import { kyGET, kyPOST } from "@/utils/ky/handlers";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Message } from "./components/message";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/stores/socket-store";

type ChatData = {
  user: UserDto;
  chat: ChatDto;
  messages: MessageDto[];
};

// Route : /chat/:userId
export default function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [chat, setChat] = useState<ChatDto | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { socket } = useSocket();

  // Get user id
  const { userId } = useParams<{ userId: string }>();

  const handleMessage = useCallback(
    (messageDto: MessageDto) => {
      if (chat && chat.id == messageDto.chat_id) {
        const existingMessage = messages.find((m) => m.id == messageDto.id);
        if (existingMessage) {
          return;
        }
        setMessages((prevMessages) => [...prevMessages, messageDto]);
      }
    },
    [chat, messages],
  );

  useEffect(() => {
    if (chat) {
      socket.on("message", handleMessage);
    }

    // socket.on("seen", (message: MessageDto) => {
    //   if (chatData?.chat.id == message.chat_id) {
    //     const chatDataCopy = { ...chatData };
    //     chatDataCopy.messages = chatDataCopy.messages.map((m) => {
    //       if (m.id === message.id) {
    //         return message;
    //       }
    //       return m;
    //     });
    //     setChatData(chatDataCopy);
    //   }
    // });

    return () => {
      socket.off("message", handleMessage);
      // socket.off("seen");
    };
  }, [chat]);

  useEffect(() => {
    if (userId?.match(/^\d+$/) == null) {
      navigate("/matches");
      return;
    }

    const fetchChatData = async () => {
      const chatDataRes = await kyGET<ChatData | { error: string }>(
        `chat/chatData/${userId}`,
        logout,
      );
      if (!chatDataRes || (chatDataRes && "error" in chatDataRes)) {
        toast.error(
          `Impossible de récuperer le chat avec l'utilisateur ${userId}.`,
        );
        navigate("/");
        return;
      }
      setChat(chatDataRes.chat);
      setUser(chatDataRes.user);
      setMessages(chatDataRes.messages);
      setLoading(false);
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  const scrollBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!chat) {
      return;
    }

    const messageData = await kyPOST<
      MessageDto | { error: string },
      {
        message: string;
      }
    >(`message/${chat.id}`, { message: inputMessage }, logout);
    if (!messageData || (messageData && "error" in messageData)) {
      toast.error(
        `Impossible de récuperer le chat avec l'utilisateur ${userId}.`,
      );
      navigate("/");
      return;
    }
    setInputMessage("");
    setMessages([...messages, messageData]);
  };

  return (
    <FullHeightContainer
      dontScroll
      className={
        loading ? "flex flex-col items-center justify-center" : "flex flex-col"
      }
    >
      {loading ? (
        <Spinner className="mx-auto mb-4 size-32">Chargement...</Spinner>
      ) : (
        <div className="h-full ">
          <div className="w-full p-4 shadow-md">
            <div className="mx-auto max-w-3xl">
              Chat avec {user?.first_name} !
            </div>
          </div>
          <div
            ref={containerRef}
            className="scroll mx-auto flex h-[80%] w-full max-w-3xl flex-col gap-1 overflow-y-auto  p-4"
          >
            {messages.map((message, index) => {
              return (
                <Message
                  seen={index === messages.length - 1 && message.seen}
                  key={message.id}
                  isMe={message.user_id != parseInt(userId!)}
                >
                  {message.content}
                </Message>
              );
            })}
          </div>
          <div className="mx-auto flex w-full max-w-3xl items-center  gap-2 overflow-y-auto  p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex w-full gap-2"
            >
              <input
                className="flex-grow  rounded-md border-2 border-primary p-2"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button disabled={inputMessage.length === 0} type="submit">
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      )}
    </FullHeightContainer>
  );
}
