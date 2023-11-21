declare global {
  interface SocketMessage {
    type: string;
    sessionId: string;
    data: any;
  }
}

export {};