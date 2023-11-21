declare global {
  interface Transaction {
    session_id: string;
    transaction_id: string;
    chain: number;
    method: string;
    payload: any;
  }
}

export {};