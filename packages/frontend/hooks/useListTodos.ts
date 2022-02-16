import { useCallback, useEffect, useState } from "react";
import { Todo } from "../../shared/models";
import { useAccessToken } from "./useAccessToken";

export const useListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearErrorMessage = useCallback(() => setErrorMessage(null), []);

  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) return;
    const listTodos = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`;

      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setTodos(data as Todo[]);
      } catch (error: any) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("listTodos API error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    listTodos();
  }, [accessToken]);

  return {
    todos,
    isLoading,
    errorMessage,
    clearErrorMessage,
  };
};
