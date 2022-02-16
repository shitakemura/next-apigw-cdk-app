import { Checkbox, HStack, Spinner, Text } from "@chakra-ui/react";
import { Todo } from "../../../shared/models";
import { useTodos } from "../../hooks/useTodosContext";
import { DeleteIcon } from "@chakra-ui/icons";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { isLoading, updateTodo, deleteTodo } = useTodos();

  return (
    <HStack
      borderColor='green.300'
      borderWidth={1}
      p={8}
      w='full'
      height='16'
      justify='space-between'
      spacing={8}>
      <HStack spacing={8}>
        <Checkbox
          size='lg'
          isChecked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        />
        <Text
          textDecoration={todo.completed ? "line-through" : undefined}
          color={todo.completed ? "gray.500" : "black"}>
          {todo.title}
        </Text>
      </HStack>
      {isLoading ? (
        <Spinner
          size='md'
          thickness='4px'
          emptyColor='gray.200'
          color='green.500'
        />
      ) : (
        <DeleteIcon
          color='green.500'
          boxSize={5}
          _hover={{ boxSize: 6 }}
          onClick={() => deleteTodo(todo.id)}
        />
      )}
    </HStack>
  );
};
