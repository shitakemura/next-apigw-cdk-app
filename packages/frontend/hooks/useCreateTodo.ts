import { useCallback, useState } from "react";
import { useAccessToken } from "./useAccessToken";

export const useCreateTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearErrorMessage = useCallback(() => setErrorMessage(null), []);

  const { accessToken } = useAccessToken();

  const createTodo = async (body: { title: string }) => {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`;

    try {
      if (!accessToken) {
        throw new Error("no access token");
      }

      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("createTodo API error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    createTodo,
  };
};
