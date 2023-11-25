import axios from "axios";
import { Response } from "../interfaces";
import { SendTransactionResponse } from "./dapp.response";

export class DappApi {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly sessionId: string;

  constructor(baseUrl: string, sessionId: string, token: string) {
    this.baseUrl = baseUrl;
    this.sessionId = sessionId;
    this.token = token;
  }

  async sendTransaction(chain: number, method: string, data: any) {
    const response = await axios.post<Response<SendTransactionResponse>>(
      `${this.baseUrl}/connect/session/${this.sessionId}/dapp/transaction`,
      {
        chain: chain,
        method: method,
        payload: data
      },
      {
        headers: {
          'x-dApp-key': this.token
        }
      });

    return response.data;
  }

  async cancelTransaction(transactionId: string): Promise<boolean> {
    const response = await axios.patch<Response<null>>(
      `${this.baseUrl}/connect/session/${this.sessionId}/dapp/transaction/${transactionId}`,
      {},
      {
        headers: {
          'x-dApp-key': this.token
        }
      });

    return response.status === 200;
  }

  async closeSession() {
    await axios.delete(`${this.baseUrl}/connect/dapp/session/${this.sessionId}`)
  }
}
