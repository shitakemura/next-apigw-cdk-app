import { VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useTodos } from "../../../hooks/useTodosContext";
import { TodoFilter } from "../TodoFilter";
import { TodoInput } from "../TodoInput";
import { TodoList } from "../TodoList";

export const FILTER_VALUES = ["ALL", "COMPLETED", "NOT COMPLETED"] as const;
type FilterTupel = typeof FILTER_VALUES;
export type Filter = FilterTupel[number];

export const TodoScreen = () => {
  const { todos, listTodos } = useTodos();
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    switch (filter) {
      case "ALL":
        return todos;
      case "COMPLETED":
        return todos.filter((todo) => todo.completed);
      case "NOT COMPLETED":
        return todos.filter((todo) => !todo.completed);
    }
  }, [todos, filter]);

  useEffect(() => {
    listTodos();
  }, [listTodos]);

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} />
    </VStack>
  );
};
