import WebSocket from "ws";
import { DappClient } from "../dapp-client";

export class DappWs {
  private ws: WebSocket;

  constructor(url: string, owner: DappClient) {
    this.ws = new WebSocket(url);

    this.ws.addEventListener('message', event => {
      const socketMessage = JSON.parse(<string>event.data) as SocketMessage;
      owner.onMessage(socketMessage);
    })
  }

  close () {
    this.ws.close();
  }
}

