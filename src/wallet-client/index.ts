import { WalletApi } from "../api";
import { PlenaClientConfig } from "./config";
import { WalletWs } from "../ws";

export class WalletClient {
  private api: WalletApi
  private ws: WalletWs;
  private connected: boolean;
  public onMessage: (msg: SocketMessage) => {};

  constructor(config: PlenaClientConfig) {
    this.connected = false;
    this.api = new WalletApi(config.bridge);
  }

  async createConnectionToDapp(dappId: string) {
    const result = await this.api.createNewConnection(dappId);

    if (!result.success) {
      throw new Error("failed to make new session")
    }

    this.api.setSessionId(result.content.id);
    this.api.setToken(result.content.token);
    return result.content;
  }

  closeConnection() {
    this.ws.close();
    this.connected = false;
  }

  async acceptConnection(address: string) {
    return await this.api.acceptConnection(address);
  }

  async approveTransaction(txId: string, txHash: string) {
    await this.api.approveTransaction(txId, txHash);
  }

  async rejectTransaction(txId: string) {
    await this.api.rejectTransaction(txId);
  }
}
