import { List, ListItem, Spinner, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Todo } from "../../../../../shared/models";
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
    <List w='full' paddingX={8}>
      {todos.map((todo) => (
        <ListItem key={todo.id} paddingY={2}>
          <TodoItem todo={todo} />
        </ListItem>
      ))}
    </List>
  );
};
