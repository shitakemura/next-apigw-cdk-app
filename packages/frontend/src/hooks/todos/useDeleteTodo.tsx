import { useCallback } from "react";
import { BASE_URL } from "../constants";
import { useAccessToken } from "../useAccessToken";
import { useApi } from "../useApi";
import { useTodos } from "../useTodos";

export const useDeleteTodo = () => {
  const { todos, setTodos } = useTodos();
  const { accessToken } = useAccessToken();
  const { isLoading, error, deleteApi, clearError } = useApi();

  const deleteTodo = useCallback(
    async (id: string) => {
      const url = BASE_URL + `/todos/${id}`;
      const deletedTodo = (await deleteApi<{ userId: string; id: string }>(
        url,
        accessToken
      )) as { userId: string; id: string };

      setTodos(
        todos.filter(
          (todo) =>
            !(todo.userId === deletedTodo.userId && todo.id === deletedTodo.id)
        )
      );
    },
    [todos, accessToken, deleteApi, setTodos]
  );

  return {
    deleteStatus: { isLoading },
    error,
    deleteTodo,
    clearError,
  };
};
