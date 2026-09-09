import axios from "axios";

interface ApiErrorResponse {
  message: string | string[];
}

export function getApiErrorMessage(error: Error, fallback: string): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  const message = error.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join(", ");
  }

  if (typeof message === "string") {
    return message;
  }

  return fallback;
}
