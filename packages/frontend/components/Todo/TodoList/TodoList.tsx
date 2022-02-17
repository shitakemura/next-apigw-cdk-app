import { Spinner, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Todo } from "../../../../shared/models";
import { useTodos } from "../../../hooks/useTodosContext";
import { TodoItem } from "../TodoItem";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  const { isLoading } = useTodos();
  const isGetLoading = useMemo(
    () => isLoading && isLoading.type === "GET" && isLoading.value === true,
    [isLoading]
  );

  if (isGetLoading) {
    return (
      <VStack p={16}>
        <Spinner />
      </VStack>
    );
  }

  return (
    <VStack w='full' paddingX={8}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </VStack>
  );
};
