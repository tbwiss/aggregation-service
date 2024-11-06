import { GetAggregatedUserDataResponse } from "./../types";

export const getUserAggregateById = (
  id: string
): GetAggregatedUserDataResponse | undefined => {
  const user = getUserAggregateById(id);
  if (!user) {
    return undefined;
  }
  return {
    ...user,
    timestamp: new Date().toISOString(),
  };
};
