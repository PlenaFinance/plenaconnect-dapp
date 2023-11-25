import { DappApi } from "../api/dapp-api";
import { PlenaConnectConfig } from "./config";
import { DappWs } from "../ws";

export class DappClient {
  private readonly ws: DappWs;
  public api: DappApi;
  public onMessage: (msg: SocketMessage) => {};

  constructor(config: PlenaConnectConfig) {
    this.api = new DappApi(config.bridge, config.sessionId, config.dappToken);
    this.ws = new DappWs(`${config.wsUrl}/dapp-ws?token=${config.dappToken}&sessionid=${config.dappSessionId}`, this);
  }

  closeConnection() {
    this.ws.close();
  }
}
