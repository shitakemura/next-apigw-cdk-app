import { stringify } from "querystring";
import { useCallback, useState } from "react";

export type isLoadingType = {
  type: "GET" | "POST" | "PUT" | "DELETE";
  id?: string;
  value: boolean;
} | null;

export const useApi = () => {
  const [isLoading, setIsLoading] = useState<{
    type: "GET" | "POST" | "PUT" | "DELETE";
    id?: string;
    value: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearErrorMessage = useCallback(() => setErrorMessage(null), []);

  const getApi = useCallback(async <T>(url: string, accessToken: string) => {
    try {
      setIsLoading({ type: "GET", value: true });
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
      setIsLoading({ type: "GET", value: false });
    }
  }, []);

  const postApi = useCallback(
    async <T, U>(url: string, accessToken: string | null, body: U) => {
      try {
        if (!accessToken) {
          throw new Error("no access token");
        }

        setIsLoading({ type: "POST", value: true });
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
        setIsLoading({ type: "POST", value: false });
      }
    },
    []
  );

  const putApi = useCallback(
    async <T, U>(
      id: string,
      url: string,
      accessToken: string | null,
      body: U
    ) => {
      try {
        if (!accessToken) {
          throw new Error("no access token");
        }

        setIsLoading({ type: "PUT", id, value: true });
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
        setIsLoading({ type: "PUT", id, value: false });
      }
    },
    []
  );

  const deleteApi = useCallback(
    async <T>(id: string, url: string, accessToken: string | null) => {
      try {
        if (!accessToken) {
          throw new Error("no access token");
        }

        setIsLoading({ type: "DELETE", id, value: true });
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
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
          setErrorMessage(`DELETE API error: ${url}`);
        }
      } finally {
        setIsLoading({ type: "DELETE", id, value: false });
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
    deleteApi,
    clearErrorMessage,
  };
};
