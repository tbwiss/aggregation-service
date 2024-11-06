import { getUserAggregate } from "../db-access/db-access";
import { GetAggregatedUserDataResponse } from "./../types";

export const getUserAggregateById = (
  id: string
): GetAggregatedUserDataResponse | undefined => {
  const user = getUserAggregate(id);
  if (!user) {
    return undefined;
  }
  return {
    ...user,
    timestamp: new Date().toISOString(),
  };
};
