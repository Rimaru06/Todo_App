import { Outlet, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Button2 from "./Button2";
import { useEffect } from "react";
interface Data {
  email : string,
  firstName : string,
  lastName : string,
}
type dataUpdate = Data | null;
const DashBoard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const data: dataUpdate = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(()=> {
    type Toke = string | null;
    const token : Toke = localStorage.getItem("token");
    if(!token) {
      navigate("/login");
    }
  },[])
  return (
    <>
      <div className="h-screen w-screen bg-black flex">
        <div className="lg:w-[15%] bg-white flex flex-col gap-5 h-full">
          <div className="h-[15%] flex justify-around  items-center gap-2 border-b-2 border-black">
            <div className="flex justify-center items-center ">
              <h1 className="text-lg font-bold flex justify-center items-center gap-2">
                <FaUser /> {data?.firstName} {data?.lastName}
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <button onClick={handleLogout}>
                <IoMdLogOut className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="h-[85%] flex flex-col  gap-5 ">
            <div>
              <Button2
                text="All Todos"
                compo={<IoMdHome />}
                path="/dashboard"
              />
            </div>
            <div>
              <Button2 text="Search" compo={<FaSearch />} />
            </div>
            <div>
              <Button2
                text="Add Todo"
                compo={<IoIosAddCircleOutline />}
                path="/dashboard/addTodo"
              />
            </div>

            <div>
              <Button2
                text="Completed Todo"
                compo={<MdOutlineIncompleteCircle />}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-[85%] h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
