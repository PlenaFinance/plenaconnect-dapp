import { WalletWs } from '../ws';
import { WalletClient } from '../wallet-client';

export class WalletSession {
  id: string;
  token: string;
  dApp: dApp;
  status: string;
  isConnectionOpen: boolean;
  ws: WalletWs;

  belongsTo: WalletClient;

  constructor(id: string, token: string, dApp: dApp, walletClient: WalletClient) {
    this.id = id;
    this.token = token;
    this.dApp = dApp;
    this.belongsTo = walletClient;
  }

  async openConnection() {
    this.ws = new WalletWs(this);
    this.isConnectionOpen = true;
  }

  close() {
    this.isConnectionOpen = false;
  }
}