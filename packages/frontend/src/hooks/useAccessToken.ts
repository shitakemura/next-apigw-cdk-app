import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const clearErrorMessage = useCallback(() => setErrorMessage(null), []);

  useEffect(() => {
    const getAccessToken = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
          scope: process.env.NEXT_PUBLIC_AUTH0_OPENID_CONNECT_SCOPE,
        });
        setAccessToken(accessToken);
      } catch (error: any) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("get access token error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  return { accessToken, isLoading, errorMessage };
};
