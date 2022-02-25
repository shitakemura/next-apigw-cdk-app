import { useCallback } from "react";
import { Todo } from "../../../../shared/models";
import { BASE_URL } from "../constants";
import { useAuth } from "../useAuth";
import { useApi } from "../useApi";
import { useTodos } from "../useTodos";

export const useCreateTodo = () => {
  const { todos, setTodos } = useTodos();
  const { accessToken } = useAuth();
  const { isLoading, error, postApi, clearError } = useApi();

  const createTodo = useCallback(
    async (body: { title: string }) => {
      const url = BASE_URL + "/todos";
      const createdTodo = (await postApi<Todo, { title: string }>(
        url,
        accessToken,
        body
      )) as Todo;

      setTodos([...todos, createdTodo]);
    },
    [todos, accessToken, postApi, setTodos]
  );

  return {
    createStatus: { isLoading },
    error,
    createTodo,
    clearError,
  };
};
