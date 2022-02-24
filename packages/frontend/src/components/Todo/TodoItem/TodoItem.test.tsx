import { render, screen } from "@testing-library/react";
import { Todo } from "../../../../shared/models";
import { TodoItem } from "./TodoItem";

const todo: Todo = {
  userId: "testUserId",
  id: "id0001",
  title: "test todo",
  completed: true,
  createdAt: 1645085807054,
};

describe("TodoItem", () => {
  test("正しいtodoが表示されること", () => {
    render(<TodoItem todo={todo} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByText("test todo")).toBeInTheDocument();
  });
});
