import {
  Checkbox,
  HStack,
  IconButton,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Todo } from "../../../../../shared/models";
import { DeleteIcon } from "@chakra-ui/icons";
import { useUpdateTodo } from "../../../hooks/todos/useUpdateTodo";
import { useDeleteTodo } from "../../../hooks/todos/useDeleteTodo";
import { useCallback, useEffect } from "react";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { error: updateError, updateTodo } = useUpdateTodo();
  const { deleteStatus, error: deleteError, deleteTodo } = useDeleteTodo();
  const toast = useToast();

  const handleOnDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id, deleteTodo]);

  const showErrorToast = useCallback(
    (message: string) => {
      return toast({ title: message, status: "error", isClosable: true });
    },
    [toast]
  );

  useEffect(() => {
    if (updateError) showErrorToast(updateError.message);
  }, [updateError, showErrorToast]);

  useEffect(() => {
    if (deleteError) showErrorToast(deleteError.message);
  }, [deleteError, showErrorToast]);

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
      {deleteStatus.isLoading ? (
        <Spinner
          size='md'
          thickness='4px'
          emptyColor='gray.200'
          color='green.500'
        />
      ) : (
        <IconButton
          aria-label='delete-icon'
          color='green.500'
          p={4}
          boxSize={5}
          _hover={{ boxSize: 6 }}
          onClick={handleOnDelete}
          icon={<DeleteIcon />}
        />
      )}
    </HStack>
  );
};
