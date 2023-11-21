import { WalletSession } from '../common';
import axios from 'axios';
import { ApiUrl } from './constants';
import { SessionDtoForUser } from './dto';

export class WalletApi {

  constructor() {
  }

  async createNewConnection (dappId: string) {
    const result = await axios.post<Response<SessionDtoForUser>>(`${ApiUrl}session`, {
      dapp_id: dappId
    })

    return result.data;
  }

  async acceptConnection (session: WalletSession, userAddress: string) {
    const result = await axios.patch<Response<null>>(`${ApiUrl}session/accept`, {
      address: userAddress
    })

    return result.data;
  }

  async rejectConnection (session: WalletSession) {
    const result = await axios.patch<Response<null>>(`${ApiUrl}session/reject`);

    return result.data;
  }

  async approveTransaction (session: WalletSession, transactionId: string, transactionHash: string) {
    const result = await axios.patch<Response<null>>(`${ApiUrl}session/${session.id}/wallet/transaction/${transactionId}/approve`, {
      transaction_hash: transactionHash
    });

    return result.data;
  }

  async rejectTransaction(session: WalletSession, transactionId: string, transactionHash: string) {

  }
}