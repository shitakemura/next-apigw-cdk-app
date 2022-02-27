import { renderHook, act } from "@testing-library/react-hooks";
import { useListTodos } from "./useListTodos";
import "whatwg-fetch";
import { server } from "../../../mocks/server";
import React from "react";
import { TodosProvider } from "../useTodos";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useListTodos", () => {
  test("Todo一覧を正しく取得できること", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <TodosProvider>{children}</TodosProvider>;
    };

    const { result } = renderHook(() => useListTodos(), {
      wrapper,
    });

    await act(() => result.current.listTodos());

    expect(result.current.listStatus).toStrictEqual({ isLoading: false });
    expect(result.current.todos.length).toBe(3);
    expect(result.current.error).toBeNull();
  });
});
