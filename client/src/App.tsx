import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
function App() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-evenly items-center bg-black ">
        <div>
          <h1 className="text-[2rem] sm:text-[4rem] font-protest text-white">Todo</h1>
        </div>
        <div className="flex gap-6">
          <Button naam="Login" handleClick={handleLoginClick} />
          <Button naam="Register" handleClick={handleRegisterClick} />
        </div>
      </div>
    </>
  );
}
export default App;
