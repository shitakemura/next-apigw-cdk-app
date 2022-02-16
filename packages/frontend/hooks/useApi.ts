import { stringify } from "querystring";
import { useCallback, useState } from "react";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearErrorMessage = useCallback(() => setErrorMessage(null), []);

  const getApi = useCallback(async <T>(url: string, accessToken: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(`GET API error: ${url}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const postApi = useCallback(
    async <T, U>(url: string, accessToken: string | null, body: U) => {
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

        return data as T;
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(`POST API error: ${url}`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const putApi = useCallback(
    async <T, U>(url: string, accessToken: string | null, body: U) => {
      try {
        if (!accessToken) {
          throw new Error("no access token");
        }

        setIsLoading(true);
        const response = await fetch(url, {
          method: "PUT",
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

        return data as T;
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(`PUT API error: ${url}`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    errorMessage,
    getApi,
    postApi,
    putApi,
    clearErrorMessage,
  };
};
