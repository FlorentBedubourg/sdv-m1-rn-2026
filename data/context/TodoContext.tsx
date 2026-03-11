import { createContext, FC, PropsWithChildren, useState } from "react";
import {
  addTodoOnDummyJson,
  deleteTodoOnDummyJson,
  getTodosOnDummyJson,
  updateTodoOnDummyJson,
} from "../api/dummyJsonApi";
import { Todo } from "../api/dummyJsonApiTypes";

interface TodoContextProps {
  todos: Todo[];
  getTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  getTodos: async () => {},
  addTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
});

export const TodoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const getTodos = async () => {
    const apiTodos = await getTodosOnDummyJson();
    if (apiTodos === null) {
      // TODO: handle error
    } else {
      setTodos(apiTodos.todos);
    }
  };
  const addTodo = async (title: string) => {
    const addedTodo = await addTodoOnDummyJson({ todo: title });
    if (addedTodo === null) {
      // TODO: handle error
    } else {
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    }
  };
  const updateTodo = async (id: number, title: string) => {
    const updatedTodo = await updateTodoOnDummyJson({ id, todo: title });
    if (updatedTodo === null) {
      // TODO: handle error
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    }
  };
  const deleteTodo = async (id: number) => {
    const result = await deleteTodoOnDummyJson(id);
    if (result) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };
  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
