import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react"
import { Todo } from "../../../shared/models"

type TodosStateContextType = {
  todos: Todo[]
}

type TodosDispatchContextType = {
  setTodos: (todos: Todo[]) => void
}

const TodosStateContext = createContext({} as TodosStateContextType)
const TodosDispatchContext = createContext({} as TodosDispatchContextType)

export const TodosProviderContainer = ({ children }: PropsWithChildren<{}>) => {
  const [todos, setTodos] = useState<Todo[]>([])
  return (
    <TodosStateContext.Provider value={{ todos }}>
      <TodosDispatchContext.Provider value={{ setTodos }}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  )
}

export const useTodosState = () => useContext(TodosStateContext)
export const useTodosDispatch = () => useContext(TodosDispatchContext)
