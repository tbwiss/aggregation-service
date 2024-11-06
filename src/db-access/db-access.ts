import { database } from "../db/db";
import { Transaction, TransactionType, UserData } from "../types";

const newUserStartBalance = 100;

const newUserBaseState = {
  balance: newUserStartBalance, // a new user gets a starting balance
  spent: [],
  earned: [],
  payout: [],
  payedOut: [],
};

export const getUserAggregate = (id: string): UserData | undefined => {
  return database.find((db) => id === db.userId);
};

const updateUser = (transaction: Transaction): void => {
  const user = getUserAggregate(transaction.userId);

  let nextUserData: UserData;
  if (user) {
    nextUserData = { ...user };
  } else {
    nextUserData = {
      userId: transaction.userId,
      ...newUserBaseState,
    };
  }

  if (transaction.type === TransactionType.earned) {
    nextUserData.earned.push(transaction.amount);
    nextUserData.balance += transaction.amount;
  }
  if (transaction.type === TransactionType.spent) {
    nextUserData.spent.push(transaction.amount);
    nextUserData.balance -= transaction.amount;
  }
  if (transaction.type === TransactionType.payout) {
    nextUserData.payout.push(transaction.amount);
    nextUserData.balance -= transaction.amount;
  }

  const index = database.findIndex(
    (item) => item.userId === nextUserData.userId
  );
  if (index !== -1) {
    // existing user
    database[index] = nextUserData;
  } else {
    // new user
    database.push(nextUserData);
  }
};

export const batchIngest = (transactions: Transaction[]): void => {
  transactions.map((transaction) => {
    updateUser(transaction);
  });
};
