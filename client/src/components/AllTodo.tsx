import { useTodofetch } from "./Hooks/DataFectch";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TodoList } from "./MarkData";
import React from "react";
const AllTodo = () => {
  const { data, loading, error } = useTodofetch();
  const [allTodos, setAllTodos] = React.useState(data || []);
  React.useEffect(() => {
    if (allTodos !== data) {
      setAllTodos(data);
    }
  },[data])
  return (
    <div className={`w-screen h-full  ${loading && "overflow-hidden"}`}>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center animate-spin  ">
          <AiOutlineLoading3Quarters size={50} color="white" />
        </div>
      ) : error ? (
        <h1>Error while data fectching</h1>
      ) : allTodos ? (
        <div className="w-full h-full ">
          <TodoList allTodos={allTodos} setAllTodos={setAllTodos} />
        </div>
      ) : (
        <h1 className="text-white font-extrabold "> No data found</h1>
      )}
    </div>
  );
};
export default AllTodo;
