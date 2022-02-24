import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Todo } from "../../../shared/models";

type TodosContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

const TodosContext = createContext({} as TodosContextType);
export const TodosProvider = ({ children }: PropsWithChildren<{}>) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
