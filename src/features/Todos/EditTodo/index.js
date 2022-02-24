import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCleanup,
  addTodo,
  editTodo,
  pageChange,
  todoSelect,
} from "../todoSlice";

const EditTodo = () => {
  const dispatch = useDispatch();
  const { selectedTodo, isEditSuccess } = useSelector(todoSelect);
  const [title, setTitle] = React.useState(selectedTodo.title);
  const [details, setDetails] = React.useState(selectedTodo.details);

  React.useEffect(() => {
    if (isEditSuccess) {
      dispatch(pageChange("todolist"));
    }
  }, [isEditSuccess]);

  React.useEffect(() => {
    return () => {
      dispatch(addCleanup());
    };
  }, []);

  const handleEditClick = () => {
    dispatch(editTodo({ ...selectedTodo, title, details }));
    setTitle("");
    setDetails("");
  };

  const handleCancelClick = () => {
    dispatch(pageChange("todolist"));
    setTitle("");
    setDetails("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col items-center p-5 gap-5">
      <div className="flex flex-col min-w-[60%]">
        <label className="text-lg font-bold">Title</label>
        <input
          className="px-3 py-1 rounded-lg focus:outline-none border border-gray-400 focus:border-sky-500"
          onChange={handleTitleChange}
          value={title}
          placeholder="ex. Swimming"
        />
      </div>
      <div className="flex flex-col min-w-[60%]">
        <label className="text-lg font-bold">Details</label>
        <input
          className="px-3 py-1 rounded-lg focus:outline-none border border-gray-400 focus:border-sky-500"
          onChange={handleDetailsChange}
          value={details}
          placeholder="ex. Swim 5km"
        />
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleEditClick}
          className="text-xl font-semibold px-10 py-1 bg-sky-400 rounded-full border-2 border-sky-400 text-white"
        >
          Update
        </button>
        <button
          onClick={handleCancelClick}
          className="text-xl font-semibold px-10 py-1 border-red-500 border-2 rounded-full text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
