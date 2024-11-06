export interface GetAggregatedUserDataResponse {
  userId: string;
  balance: number;
  earned: number[];
  spent: number[];
  payout: number[];
  payedOut: number[];
  timestamp: string;
}

// This would also have a "meta" object usually. Keeping it simple though.
export type GetTransactionResponse = Transaction[];

export interface UserData {
  userId: string;
  balance: number;
  earned: number[];
  spent: number[];
  payout: number[];
  payedOut: number[];
}

export interface Transaction {
  id: string;
  userId: string;
  createdAt: string;
  type: TransactionType;
  amount: number;
}

export enum TransactionType {
  earned = "earned",
  spent = "spent",
  payout = "payout",
}
