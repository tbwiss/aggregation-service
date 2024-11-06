import axios, { AxiosResponse } from "axios";

export const fetchTransactionData = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } else {
      // Handle non-Axios errors
      console.error("An unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch data");
  }
};
