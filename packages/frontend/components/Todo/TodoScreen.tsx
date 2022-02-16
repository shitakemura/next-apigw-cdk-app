import { VStack } from "@chakra-ui/react";
import { useListTodos } from "../../hooks/useListTodos";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  const { todos, isLoading, errorMessage } = useListTodos();

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoList todos={todos} />
    </VStack>
  );
};
