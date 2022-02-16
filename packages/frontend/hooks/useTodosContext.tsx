import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Todo } from "../../shared/models";
import { useAccessToken } from "./useAccessToken";
import { useApi } from "./useApi";

type TodosContextType = {
  todos: Todo[];
  isLoading: boolean;
  errorMessage: string | null;
  listTodos: () => void;
  createTodo: (body: { title: string }) => void;
  updateTodo: (id: string, body: { completed: boolean }) => void;
  deleteTodo: (id: string) => void;
  clearErrorMessage: () => void;
};

const TodosContext = createContext({} as TodosContextType);
const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export const TodosProvider = ({ children }: PropsWithChildren<{}>) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { accessToken } = useAccessToken();
  const {
    isLoading,
    errorMessage,
    getApi,
    postApi,
    putApi,
    deleteApi,
    clearErrorMessage,
  } = useApi();

  const listTodos = useCallback(async () => {
    if (!accessToken) return;
    const listTodos = async () => {
      const url = baseUrl + "/todos";
      const todos = (await getApi<Todo[]>(url, accessToken)) ?? [];
      setTodos(todos);
    };
    listTodos();
  }, [accessToken, getApi]);

  const createTodo = useCallback(
    async (body: { title: string }) => {
      const url = baseUrl + "/todos";
      const createdTodo = await postApi<Todo, { title: string }>(
        url,
        accessToken,
        body
      );

      if (createdTodo) {
        setTodos([...todos, createdTodo]);
      }
    },
    [todos, accessToken, postApi]
  );

  const updateTodo = useCallback(
    async (id: string, body: { completed: boolean }) => {
      const url = baseUrl + `/todos/${id}`;
      const updatedTodo = await putApi<Todo, { completed: boolean }>(
        url,
        accessToken,
        body
      );

      if (updatedTodo) {
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
      }
    },
    [todos, accessToken, putApi]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      const url = baseUrl + `/todos/${id}`;
      const deletedTodo = await deleteApi<{ userId: string; id: string }>(
        url,
        accessToken
      );

      if (deletedTodo) {
        setTodos(
          todos.filter(
            (todo) =>
              !(
                todo.userId === deletedTodo.userId && todo.id === deletedTodo.id
              )
          )
        );
      }
    },
    [todos, accessToken, deleteApi]
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        errorMessage,
        listTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        clearErrorMessage,
      }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
