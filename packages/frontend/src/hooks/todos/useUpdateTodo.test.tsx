import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useUpdateTodo } from "./useUpdateTodo";
import { TodosProviderContainer } from "../useTodos";
import { server } from "../../../mocks/server";
import "whatwg-fetch";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useUpdateTodo", () => {
  test("Todoを更新できること", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <TodosProviderContainer>{children}</TodosProviderContainer>;
    };

    const { result } = renderHook(() => useUpdateTodo(), { wrapper });

    await act(() => result.current.updateTodo("id001", { completed: true }));

    expect(result.current.updateStatus).toStrictEqual({ isLoading: false });
    expect(result.current.error).toBeNull();
  });
});
