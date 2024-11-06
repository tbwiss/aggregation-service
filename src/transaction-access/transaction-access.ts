import axios, { AxiosResponse } from "axios";

// TODO: all the console logs/infos should be logged using a logger.

export const fetchTransactionData = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.info(
          "Error response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.info("No response received:", error.request);
      } else {
        console.info("Error setting up the request:", error.message);
      }
    } else {
      // Handle non-Axios errors
      console.info("An unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch data");
  }
};
