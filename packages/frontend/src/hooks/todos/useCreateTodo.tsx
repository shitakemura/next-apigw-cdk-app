import { useCallback, useState } from "react"
import { Todo } from "../../../../shared/models"
import { BASE_URL } from "../constants"
import { useAuth } from "../useAuth"
import { postApi } from "../Api"
import { useTodosState, useTodosDispatch } from "../useTodos"

export const useCreateTodo = () => {
  const { todos } = useTodosState()
  const { setTodos } = useTodosDispatch()
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createTodo = useCallback(
    async (body: { title: string }) => {
      try {
        setIsLoading(true)
        const url = BASE_URL + "/todos"
        const createdTodo = (await postApi<Todo, { title: string }>(
          url,
          accessToken!,
          body
        )) as Todo

        setTodos([...todos, createdTodo])
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error(`Delete deleteTodo API error`))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [todos, accessToken, setTodos]
  )

  return {
    createStatus: { isLoading },
    error,
    createTodo,
  }
}
