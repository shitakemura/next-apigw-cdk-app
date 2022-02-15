import { VStack } from "@chakra-ui/react";
import { Todo } from "../../../shared/models";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  const todos: Todo[] = [
    {
      userId: "user001",
      id: "fdlkaf",
      title: "test todo",
      completed: true,
      createdAt: 1644558686117,
    },
  ];
  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoList todos={todos} />
    </VStack>
  );
};
