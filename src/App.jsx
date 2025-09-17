import { useState, useEffect } from "react";
import "./styles.css";
import { TodoList } from "./todoList";      // <-- match file casing
import { NewTodoForm } from "./NewTodoForm";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos(current => [
      ...current,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos(current =>
      current.map(t => (t.id === id ? { ...t, completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos(current => current.filter(t => t.id !== id));
  }

    return (
      <div className="app">
        <NewTodoForm onSubmit={addTodo} />
        <h1 className="todo-header">Todo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    );
}
