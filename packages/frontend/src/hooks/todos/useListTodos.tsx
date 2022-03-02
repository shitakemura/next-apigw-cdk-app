import { useTodosState, useTodosDispatch } from "../useTodos"
import { useAuth } from "../useAuth"
import { useCallback, useState } from "react"
import { BASE_URL } from "../constants"
import { Todo } from "../../../../shared/models"
import { getApi } from "../Api"

const url = BASE_URL + "/todos"

export const useListTodos = () => {
  const { todos } = useTodosState()
  const { setTodos } = useTodosDispatch()
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const listTodos = useCallback(async () => {
    try {
      setIsLoading(true)
      const todos = (await getApi<Todo[]>(url, accessToken!)) ?? []
      setTodos(todos)
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error(`GET listTodos API error`))
      }
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, setTodos])

  return {
    todos,
    listStatus: { isLoading },
    error,
    listTodos,
  }
}
