import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, pageChange, todoSelect } from "../todoSlice";
import Todo from "./Todo";

const TodoList = ({ search }) => {
  const { todos } = useSelector(todoSelect);
  const dispatch = useDispatch();
  const [todoList, setTodoList] = React.useState([]);

  React.useEffect(() => {
    setTodoList(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);

  React.useEffect(() => {
    dispatch(getTodos());
  }, []);

  console.log(todoList);

  const handleAddClick = () => {
    dispatch(pageChange("addtodo"));
  };
  return (
    <div className="p-5 flex gap-5 flex-col items-center relative">
      {!todos ? (
        <div>NO TODOS LISTED</div>
      ) : (
        todoList.map((todo, i) => {
          return <Todo todo={todo} key={i} />;
        })
      )}
      <button
        onClick={handleAddClick}
        className="text-5xl fixed bottom-[280px] right-[380px] bg-sky-400 w-20 h-20 rounded-full hover:bg-sky-300 text-white"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default TodoList;
