import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { TodoItem } from "./TodoItem"

export default { component: TodoItem } as ComponentMeta<typeof TodoItem>

export const Index: ComponentStoryObj<typeof TodoItem> = {
  args: {
    todo: {
      userId: "user001",
      id: "id001",
      title: "title",
      completed: false,
      createdAt: 1,
    },
  },
}
