import { useCallback, useState } from "react"
import { Todo } from "../../../../shared/models"
import { BASE_URL } from "../constants"
import { useAuth } from "../useAuth"
import { putApi } from "../Api"
import { useTodosState, useTodosDispatch } from "../useTodos"

export const useUpdateTodo = () => {
  const { todos } = useTodosState()
  const { setTodos } = useTodosDispatch()
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateTodo = useCallback(
    async (id: string, body: { completed: boolean }) => {
      try {
        setIsLoading(true)
        const url = BASE_URL + `/todos/${id}`
        const updatedTodo = (await putApi<Todo, { completed: boolean }>(
          url,
          accessToken!,
          body
        )) as Todo

        setTodos(
          todos.map((todo) => {
            if (
              todo.userId === updatedTodo.userId &&
              todo.id === updatedTodo.id
            ) {
              return updatedTodo
            } else {
              return todo
            }
          })
        )
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
    updateStatus: { isLoading },
    error,
    updateTodo,
  }
}
