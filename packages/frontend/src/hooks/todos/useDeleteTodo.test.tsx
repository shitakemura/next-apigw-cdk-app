import React from "react"
import { renderHook, act } from "@testing-library/react-hooks"
import { useDeleteTodo } from "./useDeleteTodo"
import { TodosProviderContainer } from "../useTodos"
import { server } from "../../../mocks/server"
import "whatwg-fetch"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("useDeleteTodo", () => {
  test("Todoを削除できること", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <TodosProviderContainer>{children}</TodosProviderContainer>
    }

    const { result } = renderHook(() => useDeleteTodo(), { wrapper })

    await act(() => result.current.deleteTodo("id0001"))

    expect(result.current.deleteStatus).toStrictEqual({ isLoading: false })
    expect(result.current.error).toBeNull()
  })
})
