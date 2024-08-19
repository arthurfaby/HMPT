import { Socket } from "socket.io";
import { io } from "../app";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { initChatRooms } from "./rooms/chat";
import { eventMessages } from "./events/messages";
import { eventNotifications } from "./events/notifications";

// Create Redis client for save socket.io session

const socketClient : { [key: number]: Socket } = {}

export function initIO() {
  io.on("connection", async (socket: Socket) => {
    socket.on("disconnect", () => {
      const userId = Object.keys(socketClient).find(key  => socketClient[parseInt(key, 10)] === socket);
      if (userId) {
        delete socketClient[parseInt(userId, 10)];
      }
    });

    //@ts-ignore | sessionID is not defined in the Socket class
    const sessionID = socket.request.sessionID as string;
    const user = await getAuthenticatedUser(sessionID);
    
    if (!user || user.id === undefined) {
      socket.disconnect();
      return;
    }
    socketClient[user.id] = socket;

    initChatRooms(socket, user);
    eventMessages(socket);
    eventNotifications(socket);
  });
}

export default socketClient;
