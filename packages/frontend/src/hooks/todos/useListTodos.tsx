import { useTodos } from "../useTodos";
import { useAuth } from "../useAuth";
import { useApi } from "../useApi";
import { useCallback } from "react";
import { BASE_URL } from "../constants";
import { Todo } from "../../../../shared/models";

export const useListTodos = () => {
  const { todos, setTodos } = useTodos();
  const { accessToken } = useAuth();
  const { isLoading, error, getApi, clearError } = useApi();

  const listTodos = useCallback(async () => {
    const callListTodos = async () => {
      const url = BASE_URL + "/todos";
      const todos = (await getApi<Todo[]>(url, accessToken)) ?? [];
      setTodos(todos);
    };
    callListTodos();
  }, [accessToken, getApi, setTodos]);

  return {
    todos,
    listStatus: { isLoading },
    error,
    listTodos,
    clearError,
  };
};
