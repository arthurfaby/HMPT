import { Socket } from "socket.io";
import { io } from "../app";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { initChatRooms } from "./rooms/chat";

export function initIO() {
  io.on("connection", async (socket: Socket) => {
    socket.on("disconnect", () => {});

    //@ts-ignore | sessionID is not defined in the Socket class
    const sessionID = socket.request.sessionID as string;
    const user = await getAuthenticatedUser(sessionID);
    if (!user) {
      socket.disconnect();
      return;
    }

    initChatRooms(socket, user);
  });
}
