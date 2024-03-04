import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import React from "react";
interface smaltodo {
  title: string;
  description: string;
  done: boolean;
  id: number;
}
const MarkedDone = ({ todo, index, setAllTodos, allTodos }: any) => {
  const [isChanging, setIsChanging] = React.useState(false);
  const [tempTodo, setTempTodo] = React.useState(todo || null);

  React.useEffect(() => {
    if (!tempTodo) {
      setTempTodo(todo);
    }
  }, [todo]);

  const handleStatusChange = async (id: number) => {
    setIsChanging(true);
    try {
      const response = await fetch(
        `http://localhost:8080/user/markedDone?todoId=${id}`,
        {
          method: "PUT",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setTempTodo({
          ...tempTodo,
          done: !tempTodo.done,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChanging(false);
    }
  };

  const handleDeleteChange = async (id: number) => {
    setIsChanging(true);
    try {
      const response = await fetch(
        `http://localhost:8080/user/delteTodo?todoId=${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const filteredTodos = allTodos.filter(
          (todo: smaltodo) => todo.id !== id
        );
        setAllTodos(filteredTodos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChanging(false);
    }
  };
  return (
    <div
      key={tempTodo.id}
      className="text-white px-4 bg-[#121212] rounded-lg  min-w-80 max-w-96 shrink-0 py-6"
    >
      <p className={`text-2xl ${tempTodo.done && "line-through"}`}>
        {index + 1}. {tempTodo.title}
      </p>
      <p className="text-neutral-400 ml-6">
        {tempTodo.description} 
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <label
          htmlFor={`todoStatus${tempTodo.id}`}
          className="flex items-center justify-center gap-2"
        >
          {!isChanging && (
            <input
              type="checkbox"
              name="todoStatus"
              id={`todoStatus${tempTodo.id}`}
              className="h-5 w-5"
              defaultChecked={tempTodo.done}
              onChange={() => {
                handleStatusChange(tempTodo.id);
              }}
              disabled={isChanging}
            />
          )}

          {isChanging ? (
            <span className="flex items-center">
              <AiOutlineLoading3Quarters
                size={20}
                className="animate-spin mr-2"
              />
              Updating
            </span>
          ) : tempTodo.done ? (
            <span className="text-green-400">Done</span>
          ) : (
            <span className="text-yellow-400">Pending</span>
          )}
        </label>
        <button
          onClick={() => {
            handleDeleteChange(tempTodo.id);
          }}
          disabled={isChanging}
        >
          <MdDelete
            size={25}
            className={` ${isChanging ? "text-neutral-700" : "text-red-400"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default MarkedDone;
