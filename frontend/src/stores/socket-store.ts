import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { initSocketEvents } from "@/services/socket/init";

interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<SocketStore>()((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));

const useSocket = (): { socket: Socket } => {
  const socket = useSocketStore((state) => state.socket);
  if (!socket) {
    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });
    useSocketStore.getState().setSocket(newSocket);

    initSocketEvents(newSocket);

    return { socket: newSocket };
  }
  return { socket };
};

export { useSocket };
