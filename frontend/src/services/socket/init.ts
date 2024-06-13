import { Socket } from "socket.io-client";

export function initSocketEvents(socket: Socket) {
  socket.on("connect", () => {
    console.log("[SOCKET] Connected");
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnected");
  });
}
