import { rest } from "msw";
import { Todo } from "../../shared/models";

let todos: Todo[] = [
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
  {
    userId: "testUser002",
    id: "id104",
    title: "TestUser002 Todo",
    completed: false,
    createdAt: 1645085807054,
  },
];

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(todos.filter((todo) => todo.userId === "testUser001"))
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`,
    (_, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ id: "id0001", title: "test todo title", completed: false })
      );
    }
  ),
];
