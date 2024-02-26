import { useTodofetch } from "./Hooks/DataFectch";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TodoList } from "./MarkData";
const AllTodo = () => {
  const { data, loading, error } = useTodofetch();
  console.log(data, loading, error);
  return (
    <div className={`w-full h-full ${loading && "overflow-hidden"}`}>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center animate-spin  ">
          <AiOutlineLoading3Quarters size={50} color="white" />
        </div>
      ) : error ? (
        <h1>Error while data fectching</h1>
      ) : data ? (
        <div>
          <TodoList Todo={data} />
        </div>
      ) : (
        <h1> No data found</h1>
      )}
    </div>
  );
};
export default AllTodo;
