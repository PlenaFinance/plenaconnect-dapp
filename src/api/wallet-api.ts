import axios from 'axios';
import { SessionDtoForUser } from './dto';
import { Response } from "../interfaces";

export class WalletApi {
  private readonly apiUrl: string;
  private token: string;
  private sessionId: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  setToken(token: string) {
    this.token = token
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  async createNewConnection(dappId: string) {
    const result = await axios.post<Response<SessionDtoForUser>>(`${this.apiUrl}session`, {
      dapp_id: dappId
    })

    return result.data;
  }

  // TODO:
  // async connectToDapp(dappUrl: string, sessionId: string) {
  //   // axios.get(`${dappUrl}`)
  // }

  async acceptConnection(userAddress: string) {
    const result = await axios.patch<Response<null>>(`${this.apiUrl}session/${this.sessionId}/accept`, {
      address: userAddress
    })

    return result.data;
  }

  async rejectConnection() {
    const result = await axios.patch<Response<null>>(`${this.apiUrl}session/${this.sessionId}/reject`, {},
      {
        headers: {
          'x-user-key': this.token,
        },
      }
    );

    return result.data;
  }

  async approveTransaction(transactionId: string, transactionHash: string) {
    const result = await axios.patch<Response<null>>(`${this.apiUrl}session/${this.sessionId}/wallet/transaction/${transactionId}/approve`, {
        transaction_hash: transactionHash
      },
      {
        headers: {
          'x-user-key': this.token,
        }
      });

    return result.data;
  }

  async rejectTransaction(transactionId: string) {
    const result = await axios.patch<Response<null>>(`${this.apiUrl}session/${this.setSessionId}/wallet/transaction/${transactionId}/reject`,
      {},
      {
        headers: {}
      });

    return result.data;
  }
}
