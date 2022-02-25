import { useCallback } from "react";
import { Todo } from "../../../../shared/models";
import { BASE_URL } from "../constants";
import { useAuth } from "../useAuth";
import { useApi } from "../useApi";
import { useTodos } from "../useTodos";

export const useUpdateTodo = () => {
  const { todos, setTodos } = useTodos();
  const { accessToken } = useAuth();
  const { isLoading, error, putApi, clearError } = useApi();

  const updateTodo = useCallback(
    async (id: string, body: { completed: boolean }) => {
      const url = BASE_URL + `/todos/${id}`;
      const updatedTodo = (await putApi<Todo, { completed: boolean }>(
        id,
        url,
        accessToken,
        body
      )) as Todo;

      setTodos(
        todos.map((todo) => {
          if (
            todo.userId === updatedTodo.userId &&
            todo.id === updatedTodo.id
          ) {
            return updatedTodo;
          } else {
            return todo;
          }
        })
      );
    },
    [todos, accessToken, putApi, setTodos]
  );

  return {
    updateStatus: { isLoading },
    error,
    updateTodo,
    clearError,
  };
};
