import { useEffect, useState } from "react";
import { Todo } from "../../shared/models";

export const useListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const listTodos = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/todos`;

      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setTodos(data as Todo[]);
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("listTodos API error");
        }
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
