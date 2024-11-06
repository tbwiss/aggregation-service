import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchTransactionData } from "./transaction-access";
import { Transaction, TransactionType } from "../types";

const mock = new MockAdapter(axios);

describe("fetchTransactionData", () => {
  const url = "https://api.example.com/transaction";

  afterEach(() => {});

  it("should return data when the request is successful", async () => {
    const mockData: Transaction = {
      id: "id-1",
      userId: "123",
      createdAt: "2023-10-10",
      type: TransactionType.earned,
      amount: 10,
    };

    mock.onGet(url).reply(200, mockData);

    const data = await fetchTransactionData<typeof mockData>(url);

    expect(data).toEqual(mockData);
  });

  it("should throw an error with a custom message when the request fails with a non-2xx status", async () => {
    mock.onGet(url).reply(404, { message: "Not Found" });

    await expect(fetchTransactionData(url)).rejects.toThrow(
      "Failed to fetch data"
    );
  });

  it("should throw an error when no response is received", async () => {
    mock.onGet(url).networkError();

    await expect(fetchTransactionData(url)).rejects.toThrow(
      "Failed to fetch data"
    );
  });

  it("should throw an error for non-Axios errors", async () => {
    jest
      .spyOn(axios, "get")
      .mockRejectedValueOnce(new Error("Some other error"));

    await expect(fetchTransactionData(url)).rejects.toThrow(
      "Failed to fetch data"
    );

    jest.restoreAllMocks();
  });
});
