import { Socket } from "socket.io-client";

export function initSocketEvents(socket: Socket) {
  socket.on("connect", () => {});

  socket.on("disconnect", () => {});
}
