import { Socket } from "socket.io";
import { User } from "../../models/user_model";
import { Chat } from "../../models/chat_model";

export async function initChatRooms(socket: Socket, user: User) {
  if (!user.id) {
    socket.disconnect();
    return;
  }

  const chats1 = await Chat.select({ user1_id: { equal: user.id } });
  const chats2 = await Chat.select({ user2_id: { equal: user.id } });

  const chatsOfUser = [...chats1, ...chats2];
  for (const chat of chatsOfUser) {
    socket.join(`chat-${chat.id}`);
  }
}
