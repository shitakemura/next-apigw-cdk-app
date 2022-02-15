import { useEffect, useState } from "react";
import { Todo } from "../../shared/models";

export const useListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const listTodos = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`;

      setLoading(true);
      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const todos = await data.json();
        setTodos(todos);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    listTodos();
  }, []);

  return {
    todos,
    loading,
    error,
  };
};
