import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTodos } from "../../../hooks/useTodosContext";
import { TodoInput } from "../TodoInput";
import { TodoList } from "../TodoList";

export const TodoScreen = () => {
  const { todos, listTodos } = useTodos();

  useEffect(() => {
    listTodos();
  }, [listTodos]);

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoList todos={todos} />
    </VStack>
  );
};
