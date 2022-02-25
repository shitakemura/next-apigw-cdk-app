import { cleanup, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Todo } from "../../../../../shared/models";
import { TodoItem } from "./TodoItem";

let todo: Todo = {
  userId: "testUserId",
  id: "id0001",
  title: "test todo",
  completed: true,
  createdAt: 1645085807054,
};

const server = setupServer(
  rest.put("/greeting", (req, res, ctx) => {
    todo = { ...todo, completed: !todo.completed };
    return res(ctx.status(200), ctx.json(todo));
  })
);

describe("TodoItem", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test("初期表示", () => {
    const { asFragment } = render(<TodoItem todo={todo} />);
    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("test todo")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
