import { Outlet, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Button2 from "./Button2";
import { useEffect, useState } from "react";
interface Data {
  email: string;
  firstName: string;
  lastName: string;
}
type dataUpdate = Data | null;
const DashBoard = () => {
  const [show, setshow] = useState(true);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const data: dataUpdate = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    type Toke = string | null;
    const token: Toke = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="h-screen w-screen bg-black flex relative">
        <button
          className="absolute  w-[10%] h-[10%] flex justify-center items-center  z-50"
          onClick={() => {
            setshow(!show);
          }}
        >
          <BsFillMenuButtonWideFill
            className={`text-3xl ${show ? "text-white" : "text-black"}`}
          />
        </button>
        <div
          className={`absolute w-full sm:w-[20%] md:w-[25%] lg:w-[20%] xl:w-[15%]  bg-white  gap-5 h-full transition-transform duration-300 ease-out 
         ${show ? "hidden" : "block"}`}
        >
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
              <Button2
                text="Search"
                compo={<FaSearch />}
                path="/dashboard/search"
              />
            </div>
            <div>
              <Button2
                text="Add Todo"
                compo={<IoIosAddCircleOutline />}
                path="/dashboard/addTodo"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
