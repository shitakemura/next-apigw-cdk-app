import { cleanup, render, screen } from "@testing-library/react";
import { TodoInput } from "./TodoInput";

describe("TodoInput", () => {
  test("初期表示", () => {
    const { asFragment } = render(<TodoInput />);
    expect(asFragment()).toMatchSnapshot();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    const button = screen.getByRole("button", { name: "Add Todo" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
