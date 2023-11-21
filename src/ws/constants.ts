export const WalletWsUrl = 'ws://localhost:9001/ws';
export const DappWsUrl = 'ws://localhost:9001/dapp-ws';

export const socketEvents = {
  connect: "connect",
  disconnect: "disconnect",
  sessionUpdate: "session_update",
  transactionRequest: "transaction_request",
  requestCancellation: "request_cancellation"
}