import { Spinner } from "@/components/ui/spinner";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { ChatDto } from "@/dtos/chat_dto";
import { MessageDto } from "@/dtos/message_dto";
import { UserDto } from "@/dtos/user_dto";
import { useAuth } from "@/hooks/useAuth";
import { kyGET } from "@/utils/ky/handlers";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Message } from "./components/message";
import { Button } from "@/components/ui/button";

type ChatData = {
  user: UserDto;
  chat: ChatDto;
  messages: MessageDto[];
};

// Route : /chat/:userId
export default function Chat() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Get user id
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId?.match(/^\d+$/) == null) {
      navigate("/matches");
      return;
    }

    const fetchChatData = async () => {
      const chatData = await kyGET<ChatData | { error: string }>(
        `chat/${userId}`,
        logout,
      );
      if (!chatData || (chatData && "error" in chatData)) {
        toast.error(
          `Impossible de récuperer le chat avec l'utilisateur ${userId}.`,
        );
        navigate("/");
        return;
      }
      setChatData(chatData);
      setLoading(false);
    };

    fetchChatData();
  }, []);

  const sendMessage = async () => {};

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
              Chat avec {chatData?.user.first_name} !
            </div>
          </div>
          <div className="mx-auto flex h-[80%] w-full max-w-3xl flex-col justify-end gap-2 overflow-y-auto  p-4">
            {chatData?.messages.map((message) => {
              return (
                <Message
                  key={message.id}
                  isMe={message.user_id != parseInt(userId!)}
                >
                  {message.content}
                </Message>
              );
            })}
          </div>
          <div className="mx-auto flex w-full max-w-3xl items-center  gap-2 overflow-y-auto  p-4">
            <input
              className="flex-grow  rounded-md border-2 border-primary p-2"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button>Envoyer</Button>
          </div>
        </div>
      )}
    </FullHeightContainer>
  );
}
