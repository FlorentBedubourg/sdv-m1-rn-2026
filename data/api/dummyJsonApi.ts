import { GetTodosResponse, Todo } from "./dummyJsonApiTypes";

const TODOS_URL = "https://dummyjson.com/todos";
const ADD_TODO_URL = "https://dummyjson.com/todos/add";

export const getTodosOnDummyJson =
  async (): Promise<GetTodosResponse | null> => {
    try {
      const response = await fetch(TODOS_URL, { method: "GET" });
      if (response.ok) {
        return (await response.json()) as GetTodosResponse;
      }
      throw new Error(`Could not get todos, status: ${response.status}`);
    } catch (e) {
      console.error("Something went wrong while getting todos on DummyJson", e);
    }
    return null;
  };

export const addTodoOnDummyJson = async (
  todo: Partial<Todo>,
): Promise<Todo | null> => {
  try {
    const response = await fetch(ADD_TODO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: false, userId: 5 }),
    });
    if (response.ok) {
      return (await response.json()) as Todo;
    }
    throw new Error(`Could not add todo, status: ${response.status}`);
  } catch (e) {
    console.error("Something went wrong while adding a todo on DummyJson", e);
  }
  return null;
};

export const updateTodoOnDummyJson = async (
  todo: Partial<Todo>,
): Promise<Todo | null> => {
  try {
    const response = await fetch(`${TODOS_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: todo.todo }),
    });
    if (response.ok) {
      return (await response.json()) as Todo;
    }
    throw new Error(`Could not modify todo, status: ${response.status}`);
  } catch (e) {
    console.error("Something went wrong while modifying todo on DummyJson", e);
  }
  return null;
};

export const deleteTodoOnDummyJson = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${TODOS_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    }
    throw new Error(`Could not delete todo, status: ${response.status}`);
  } catch (e) {
    console.error("Something ent wrong while deleting todo on DummyJson", e);
  }
  return false;
};
