import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Todo } from "../../../../../shared/models";
import { TodoList } from "./TodoList";

const todos: Todo[] = [
  {
    userId: "testUser001",
    id: "id001",
    title: "First Todo",
    completed: false,
    createdAt: 1645085807054,
  },
  {
    userId: "testUser001",
    id: "id002",
    title: "Second Todo",
    completed: false,
    createdAt: 1645085807054,
  },
  {
    userId: "testUser001",
    id: "id003",
    title: "Thire Todo",
    completed: true,
    createdAt: 1645085807054,
  },
];

describe("TodoList", () => {
  afterEach(() => cleanup());

  test("初期表示、ローディング中", () => {
    const { asFragment } = render(<TodoList todos={[]} isLoading={true} />);
    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("初期表示、ローディング後", () => {
    const { asFragment } = render(<TodoList todos={todos} isLoading={false} />);
    expect(asFragment()).toMatchSnapshot();

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    const list = screen.findByRole("list");
    waitFor(() => expect(list).toBeInTheDocument());
  });
});
