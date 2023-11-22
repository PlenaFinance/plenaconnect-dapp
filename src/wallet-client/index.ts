import { WalletSession } from '../common';
import { SessionKeyValue } from './interfaces';
import { WalletApi } from "../api";

export class WalletClient {
  private api: WalletApi
  private readonly sessions: SessionKeyValue;
  public onMessage: (msg: SocketMessage) => {};

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

  async approveTransaction(tx: Transaction, txHash: string) {
    const session = this.sessions[tx.session_id];
    if (!session) {
      throw new Error("session not found");
    }
    await this.api.approveTransaction(session, tx.transaction_id, txHash);
  }

  async rejectTransaction(tx: Transaction) {
    const session = this.sessions[tx.session_id];
    if (!session) {
      throw new Error("session not found");
    }
    await this.api.rejectTransaction(session, tx.transaction_id);
  }
}
