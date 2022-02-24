import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "./features/Todos";
import TodoList from "./features/Todos/TodoList";
import { addTodo, getTodos, todoSelect } from "./features/Todos/todoSlice";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-sky-200">
      <Todos />
    </div>
  );
}

export default App;
