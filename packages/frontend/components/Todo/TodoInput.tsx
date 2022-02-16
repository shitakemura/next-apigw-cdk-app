import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Todo } from "../../../shared/models";
import { useCreateTodo } from "../../hooks/useCreateTodo";

export const TodoInput = () => {
  const [titleInput, setTitleInput] = useState("");
  const { isLoading, createTodo } = useCreateTodo();

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
        isLoading={isLoading}
        onClick={() => createTodo({ title: titleInput })}>
        Add Todo
      </Button>
    </HStack>
  );
};
