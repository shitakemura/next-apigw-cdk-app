import { Button, HStack, Input } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useTodos } from "../../../hooks/useTodosContext";

export const TodoInput = () => {
  const [titleInput, setTitleInput] = useState("");
  const { isLoading, createTodo } = useTodos();
  const clearTitleInput = useCallback(() => setTitleInput(""), []);

  const isPostLoading = useMemo(() => {
    return (
      (isLoading && isLoading.type === "POST" && isLoading.value === true) ??
      false
    );
  }, [isLoading]);

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
        isLoading={isPostLoading}
        onClick={() => {
          createTodo({ title: titleInput });
          clearTitleInput();
        }}>
        Add Todo
      </Button>
    </HStack>
  );
};
