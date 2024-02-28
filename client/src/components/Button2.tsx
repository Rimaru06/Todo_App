import React from "react";
import { useNavigate } from "react-router-dom";
interface Button2Props {
    text : string,
    compo? : React.ReactNode,
    path? : string
}
const Button2 = (props  : Button2Props) => {
  const naviagte = useNavigate();
  return (
    <>
      <button onClick={() => naviagte(`${props.path}`)} className="border-2 w-[90%] text-start h-11 rounded-md ml-1 font-semibold pl-2 shadow-inner flex items-center gap-4 ">
        {props.compo}
        {props.text}
      </button>
    </>
  );
}

export default Button2