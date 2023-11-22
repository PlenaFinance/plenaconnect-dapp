import { WalletSession } from '../common';

export interface SessionKeyValue {
  [sessionId: string]: WalletSession;
}
