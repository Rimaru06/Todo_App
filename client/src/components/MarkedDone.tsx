import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import React from "react";
const MarkedDone = ({todo, index}: any) => {
  const [isChanging, setIsChanging] = React.useState(false);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsChanging(false);
  };
  return (
    <div
      key={todo.id}
      className="text-white px-4 bg-[#121212] rounded-lg min-w-96 max-w-96 shrink-0 py-6"
    >
      <p className={`text-2xl ${todo.done && "line-through"}`}>
        {index + 1}. {todo.title}
      </p>
      <p className="text-neutral-400 ml-6">
        {todo.description} Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Velit nihil quos aperiam itaque cumque dolorem architecto odio
        libero. Aspernatur, dolor ex. Accusamus at inventore vel, assumenda
        doloremque voluptatibus! Laudantium, veritatis! Iusto facilis sint
        repellat debitis modi neque magnam labore commodi?
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <label
          htmlFor={`todoStatus${todo.id}`}
          className="flex items-center justify-center gap-2"
        >
          {!isChanging && (
            <input
              type="checkbox"
              name="todoStatus"
              id={`todoStatus${todo.id}`}
              className="h-5 w-5"
              defaultChecked={todo.done}
              onChange={() => {
                handleStatusChange(todo.id);
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
          ) : todo.done ? (
            <span className="text-green-400">Done</span>
          ) : (
            <span className="text-yellow-400">Pending</span>
          )}
        </label>
        <MdDelete size={25} className="text-red-400" />
      </div>
    </div>
  );
};

export default MarkedDone;
