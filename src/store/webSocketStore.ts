import { create } from "zustand";

interface WebSocketStore {
  socket: WebSocket | null;
  setSocket: (newSocket: WebSocket | null) => void;
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  setSocket: (newSocket) => set({ socket: newSocket }),
}));

export default useWebSocketStore;
