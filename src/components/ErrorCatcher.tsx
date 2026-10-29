import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data?.message === "string") return data.message;
    if (typeof data?.detail === "string") return data.detail;

    if (typeof data === "string") return data;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
};