import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import TodoList from "./TodoList";
import { todoSelect } from "./todoSlice";

const Todos = () => {
  const { currentPage } = useSelector(todoSelect);
  const [search, setSearch] = React.useState("");

  const pageChanger = () => {
    switch (currentPage) {
      case "addtodo":
        return <AddTodo />;
      case "edittodo":
        return <EditTodo />;
      default:
        return <TodoList search={search} />;
    }
  };

  return (
    <div className="bg-slate-50 flex flex-col rounded-2xl min-h-[800px] max-w-[500px]">
      <div className="flex items-center gap-5 p-5 border-b ">
        <h1 className="text-xl font-bold">Todo List</h1>
        <p>{dayjs().format("MMMM DD")}</p>
        <div className="bg-white p-2 rounded-xl border border-gray-300">
          <input
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            className="focus: outline-none text-lg"
          />
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll">{pageChanger()} </div>
    </div>
  );
};

export default Todos;
