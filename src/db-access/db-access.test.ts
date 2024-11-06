import { database } from "./../db/db";
import { Transaction, TransactionType, UserData } from "../types";
import { updateUser, getUserAggregate } from "./db-access";

jest.mock("./db-access.ts", () => ({
  ...jest.requireActual("./db-access.ts"), // Keep `updateUser` available
  getUserAggregate: jest.fn(),
}));

describe("updateUser", () => {
  beforeEach(() => {
    (getUserAggregate as jest.Mock).mockClear();
    database.length = 0; // Clear the database array before each test
  });

  it("should create a new user when no existing user is found", () => {
    (getUserAggregate as jest.Mock).mockReturnValue(null);

    const transaction: Transaction = {
      id: "id-1",
      userId: "user1",
      createdAt: "2023-10-10",
      type: TransactionType.earned,
      amount: 100,
    };

    updateUser(transaction);

    expect(database.length).toBe(1);
    expect(database[0]).toEqual({
      userId: "user1",
      earned: [100],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 200,
    });
  });

  it("should update an existing user when found", () => {
    const existingUser: UserData = {
      userId: "user1",
      earned: [50],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 50,
    };
    database.push(existingUser);

    (getUserAggregate as jest.Mock).mockReturnValue(existingUser);

    const transaction: Transaction = {
      id: "id-1",
      userId: "user1",
      createdAt: "2023-10-10",
      amount: 100,
      type: TransactionType.earned,
    };

    updateUser(transaction);

    expect(database.length).toBe(1);
    expect(database[0]).toEqual({
      userId: "user1",
      earned: [50, 100],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 150,
    });
  });

  it('should update balance and add to spent array for a "spent" transaction', () => {
    const existingUser: UserData = {
      userId: "user1",
      earned: [200],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 200,
    };
    database.push(existingUser);

    (getUserAggregate as jest.Mock).mockReturnValue(existingUser);

    const transaction: Transaction = {
      id: "id-1",
      userId: "user1",
      createdAt: "2023-10-10",
      amount: 50,
      type: TransactionType.spent,
    };

    updateUser(transaction);

    expect(database[0]).toEqual({
      userId: "user1",
      earned: [200],
      spent: [50],
      payout: [],
      payedOut: [],
      balance: 150,
    });
  });

  it('should update balance and add to payout array for a "payout" transaction', () => {
    const existingUser: UserData = {
      userId: "user1",
      earned: [200],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 200,
    };
    database.push(existingUser);

    (getUserAggregate as jest.Mock).mockReturnValue(existingUser);

    const transaction: Transaction = {
      id: "id-1",
      userId: "user1",
      createdAt: "2023-10-10",
      amount: 100,
      type: TransactionType.payout,
    };

    updateUser(transaction);

    expect(database[0]).toEqual({
      userId: "user1",
      earned: [200],
      spent: [],
      payout: [100],
      payedOut: [],
      balance: 100,
    });
  });

  it("should push a new user to the database if user is not found in database or getUserAggregate", () => {
    (getUserAggregate as jest.Mock).mockReturnValue(null);

    const transaction: Transaction = {
      id: "id-1",
      userId: "user1",
      createdAt: "2023-10-10",
      amount: 150,
      type: TransactionType.earned,
    };

    updateUser(transaction);

    expect(database.length).toBe(1);
    expect(database[0]).toEqual({
      userId: "user1",
      earned: [100, 150],
      spent: [],
      payout: [],
      payedOut: [],
      balance: 250,
    });
  });
});
