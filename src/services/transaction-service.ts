import { batchIngest } from "../db-access/db-access";
import { fetchTransactionData } from "../transaction-access/transaction-access";
import { GetTransactionResponse } from "../types";

const baseUrl = "http:localhost:3000"; // This should be moved to a .env file

export const fetchTransactions = async () => {
  // TODO: this also needs a filter by date or pagination
  const transactions = await fetchTransactionData<GetTransactionResponse>(
    `${baseUrl}/transactions`
  );
  if (transactions.length > 0) {
    batchIngest(transactions);
  }
};
