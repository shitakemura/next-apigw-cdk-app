import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "../hooks/useAuth";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ""}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIERCT_URL ?? ""}
      audience={process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE}
      scope={process.env.NEXT_PUBLIC_AUTH0_SCOPE}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}

export default MyApp;
