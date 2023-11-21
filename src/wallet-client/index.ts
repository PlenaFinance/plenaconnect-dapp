import { WalletSession } from '../common';
import { SessionKeyValue } from './interfaces';

export class WalletClient {
  sessions: SessionKeyValue;


  constructor() {
    this.sessions = {};
  }

  deleteSession(session: WalletSession) {
    delete session[session.id];
  }

  listenToEvents() {

  }
}