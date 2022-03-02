import React from "react"
import { renderHook, act } from "@testing-library/react-hooks"
import { useCreateTodo } from "./useCreateTodo"
import { server } from "../../../mocks/server"
import { TodosProviderContainer } from "../useTodos"
import "whatwg-fetch"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("useCreateTodo", () => {
  test("Todoを登録できること", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <TodosProviderContainer>{children}</TodosProviderContainer>
    }

    const { result } = renderHook(() => useCreateTodo(), { wrapper })

    await act(() => result.current.createTodo({ title: "test todo title" }))

    expect(result.current.createStatus).toStrictEqual({ isLoading: false })
    expect(result.current.error).toBeNull()
  })
})
