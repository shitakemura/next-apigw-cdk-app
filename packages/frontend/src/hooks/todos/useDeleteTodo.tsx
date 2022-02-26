import { useCallback, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../useAuth";
import { deleteApi } from "../Api";
import { useTodos } from "../useTodos";

export const useDeleteTodo = () => {
  const { todos, setTodos } = useTodos();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const url = BASE_URL + `/todos/${id}`;
        const deletedTodo = (await deleteApi<{ userId: string; id: string }>(
          url,
          accessToken!
        )) as { userId: string; id: string };

        setTodos(
          todos.filter(
            (todo) =>
              !(
                todo.userId === deletedTodo.userId && todo.id === deletedTodo.id
              )
          )
        );
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error(`Delete deleteTodo API error`));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [todos, accessToken, setTodos]
  );

  return {
    deleteStatus: { isLoading },
    error,
    deleteTodo,
  };
};
