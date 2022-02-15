import { VStack } from "@chakra-ui/react";
import { useListTodos } from "../../hooks/useListTodos";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  const { todos, loading, error } = useListTodos();

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoList todos={todos} />
    </VStack>
  );
};
