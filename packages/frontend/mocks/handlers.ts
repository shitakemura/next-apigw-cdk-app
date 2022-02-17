import { rest, RestRequest } from "msw";
import { Todo } from "../../shared/models";

const testUserId = "testUserId";

let todos: Todo[] = [
  {
    userId: "testUserId",
    id: "fdajlkow",
    title: "First Todo",
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
        ctx.json(todos.filter((todo) => todo.userId === testUserId))
      );
    }
  ),
];
