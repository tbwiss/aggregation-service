import { database } from "../db/db";
import { UserData } from "../types";

export const getUserAggregate = (id: string): UserData | undefined => {
  return database.find((db) => id === db.userId);
};

export const batchIngest = () => {};
