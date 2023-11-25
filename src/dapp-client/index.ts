import { DappApi } from "../api/dapp-api";
import { PlenaConnectConfig } from "./config";
import { DappWs } from "../ws";

export class DappClient {
  private readonly ws: DappWs;
  private api: DappApi;
  public onMessage: (msg: SocketMessage) => {};

  constructor(config: PlenaConnectConfig) {
    this.api = new DappApi(config.bridge, config.sessionId, config.dappToken);
    this.ws = new DappWs(`${config.wsUrl}/dapp-ws?token=${config.dappToken}&sessionid=${config.dappSessionId}`, this);
  }

  sendTransaction(chain: number, method: string, data: any) {
    return this.api.sendTransaction(chain, method, data)
  }

  cancelTransaction(transactionId: string) {
    return this.api.cancelTransaction(transactionId);
  }

  closeConnection() {
    this.ws.close();
  }
}
