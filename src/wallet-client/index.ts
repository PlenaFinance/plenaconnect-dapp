import { WalletSession } from '../common';
import { SessionKeyValue } from './interfaces';
import { WalletApi } from "../api";

export class WalletClient {
  api: WalletApi
  sessions: SessionKeyValue;


  constructor() {
    this.api = new WalletApi();
    this.sessions = {};
  }

  async createConnectionToDapp(dappId: string) {
      const result = await this.api.createNewConnection(dappId);

      if (result.success) {
        return result.content;
      }

      return null;
  }

  closeConnectionToDapp(dappId: string) {
    for (const id in this.sessions) {
      if (dappId === id) {
        this.closeSession(this.sessions[dappId]);
        break
      }
    }
  }

  private closeSession(session: WalletSession) {
    session.close();
    delete session[session.id];
  }

  listenToEvents() {

  }

  onTransaction(tx: Transaction) {

  }

  approveTransaction() {

  }
}
