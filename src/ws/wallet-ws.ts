import { WalletSession } from '../common';
import WebSocket from 'ws';

export class WalletWs {
  private ws: WebSocket;

  constructor (session: WalletSession){
    this.ws = new WebSocket(`${WalletWs}?sessionid=${session.id}&token=${session.token}`);

  }

  public listenToTransactionEvents(callback: (msg: SocketMessage) => {}) {
    this.ws.addEventListener('message', event => {
      const socketMessage = JSON.parse(<string>event.data) as SocketMessage;
      callback(socketMessage);
    })
  }

  public close() {
    this.ws.close()
  }
}
