export interface GetAggregatedUserDataResponse {
  userId: string;
  balance: number;
  earned: number[];
  spent: number[];
  payout: number[];
  payedOut: number[];
  timestamp: string;
}

export interface UserData {
  userId: string;
  balance: number;
  earned: number[];
  spent: number[];
  payout: number[];
  payedOut: number[];
}
