import { Spinner, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Todo } from "../../../../shared/models";
import { useTodos } from "../../../hooks/useTodos";
import { TodoItem } from "../TodoItem";

type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoList = ({ todos, isLoading }: TodoListProps) => {
  if (isLoading) {
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
