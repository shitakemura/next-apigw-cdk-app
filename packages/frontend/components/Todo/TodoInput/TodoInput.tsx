import { Button, HStack, Input } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useCreateTodo } from "../../../hooks/todos/useCreateTodo";

export const TodoInput = () => {
  const [titleInput, setTitleInput] = useState("");
  const { createStatus, createTodo } = useCreateTodo();
  const clearTitleInput = useCallback(() => setTitleInput(""), []);

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
