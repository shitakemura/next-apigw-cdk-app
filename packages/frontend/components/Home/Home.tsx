import { Spinner, Stack, VStack } from "@chakra-ui/react";
import { useAccessToken } from "../../hooks/useAccessToken";
import { TodosProvider } from "../../hooks/useTodosContext";
import { Header } from "../Header";
import { Login } from "../Login";
import { TodoScreen } from "../Todo";

export const Home = () => {
  const { accessToken, isLoading, errorMessage } = useAccessToken();

  if (isLoading) {
    return (
      <Stack w='full' h='100vh' justifyContent='center' alignItems='center'>
        <Spinner
          thickness='4px'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Stack>
    );
  }

  if (!accessToken) {
    return <Login />;
  } else {
    return (
      <VStack>
        <Header />
        <TodosProvider>
          <TodoScreen />
        </TodosProvider>
      </VStack>
    );
  }
};
