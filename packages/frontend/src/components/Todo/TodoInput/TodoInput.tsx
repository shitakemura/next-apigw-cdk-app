import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useCreateTodo } from "../../../hooks/todos/useCreateTodo";

export const TodoInput = () => {
  const [titleInput, setTitleInput] = useState("");
  const { createStatus, error, createTodo } = useCreateTodo();
  const clearTitleInput = useCallback(() => setTitleInput(""), []);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({ title: error.message, status: "error", isClosable: true });
    }
  }, [error, toast]);

  return (
    <HStack spacing={6}>
      <Input
        borderColor='green.500'
        borderWidth={2}
        height={12}
        width={400}
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <Button
        paddingX={8}
        colorScheme='green'
        disabled={!titleInput}
        isLoading={createStatus.isLoading}
        onClick={() => {
          createTodo({ title: titleInput });
          clearTitleInput();
        }}>
        Add Todo
      </Button>
    </HStack>
  );
};
