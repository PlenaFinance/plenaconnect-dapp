import { WalletSession } from '../common';
import WebSocket from 'ws';

export class WalletWs {
  private ws: WebSocket;
  private ownerSession: WalletSession;

  constructor (session: WalletSession){
    this.ws = new WebSocket(`${WalletWs}?sessionid=${session.id}&token=${session.token}`);
    this.ownerSession = session;
    this.listenToTransactionEvents();
  }

  private listenToTransactionEvents() {
    this.ws.addEventListener('message', event => {
      const socketMessage = JSON.parse(<string>event.data) as SocketMessage;
      this.ownerSession.belongsTo.onMessage(socketMessage);
    })
  }

  public close() {
    this.ws.close()
  }
}
