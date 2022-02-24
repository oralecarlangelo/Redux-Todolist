import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  pageChange,
  selectEdit,
  setIsCompleted,
} from "../../todoSlice";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = React.useState(false);

  const onParentClick = () => {
    dispatch(setIsCompleted({ id: todo.id, isCompleted: !todo.isCompleted }));
  };

  const onDeleteClick = () => {
    dispatch(deleteTodo(todo.id));
  };

  const onEditClick = () => {
    dispatch(selectEdit(todo));
    dispatch(pageChange("edittodo"));
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onParentClick}
      className="w-[90%] bg-white shadow-md rounded-lg p-3 flex items-center"
    >
      <div
        className={`${
          todo.isCompleted || hover
            ? "bg-sky-400"
            : "bg-cyan-50 border-2 border-gray-400"
        } w-10 h-10 rounded-full flex justify-center items-center text-white`}
      >
        {todo.isCompleted && <i className="fa-solid fa-check fa-xl"></i>}
      </div>
      <div className="flex-1 ">
        <div
          className={`font-bold pb-1 px-3 flex border-b-2 ${
            todo.isCompleted || hover ? "border-sky-400 " : "border-gray-400"
          } justify-between items-center`}
        >
          {todo.title}
          <div className="flex gap-5">
            <button
              onClick={onEditClick}
              className={`w-7 h-7 ${
                todo.isCompleted || hover ? "bg-sky-400" : "bg-gray-400"
              } text-white hover:bg-sky-300 rounded-full flex justify-center items-center`}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={onDeleteClick}
              className={`w-7 h-7 ${
                todo.isCompleted || hover ? "bg-sky-400" : "bg-gray-400"
              } text-white hover:bg-sky-300 rounded-full flex justify-center items-center`}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="pt-1 px-3">{todo.details}</div>
      </div>
    </div>
  );
};

export default Todo;
