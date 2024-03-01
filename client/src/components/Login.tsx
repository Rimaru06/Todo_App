import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [showpassword , setshowpassword]= useState(false);
  const handleSubmit = async (values : {
    email: string,
    password: string
  }) => {
    try {
      const res : AxiosResponse = await axios.post("http://localhost:8080/user/signin", values);
      if(res.status === 200)
      {
        console.log(res.data);
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        localStorage.setItem("user", JSON.stringify(res.data.userinfo));
        toast.success("Login Success");
        navigate("/dashboard");

      }
      else
      {
        toast.error("Login Failed");
      }

    } catch (error : any) {
        console.log(error);
        toast.error(`${error.response.data}`);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center bg-black ">
        <div className="= h-[35vh] sm:h-[40vh] sm:w-[50vw]   lg:h-[40vh] lg:w-[40vw] xl:h-[50vh] xl:w-[30vw]  shadow-2xl rounded-md flex flex-col gap-2">
          <div className="flex justify-center">
            <h1 className="text-[2rem] sm:text-[4rem] font-protest text-white">
              Signin
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              handleSubmit(values);
             
            }}
          >
            <Form className="grid grid-cols-1 w-full h-full gap-2 ">
              <div className="flex justify-center items-center">
                <div className="flex flex-col ">
                  <label className="font-protest text-white" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="border-2 border-black w-[20rem] h-[2.5rem] rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="text-xs text-red-500 font-protest">
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>
              <div className="flex  justify-center  ">
                <div className="flex flex-col ">
                  <label
                    className="font-protest text-white ml-6"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="flex justify-center items-center gap-2 ">
                    <Field
                      type={showpassword ? "text" : "password"}
                      name="password"
                      autocomplete="current-password"
                      className="border-2 border-black w-[20rem] h-[2.5rem] rounded-md shadow-md pl-3 ml-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Field
                      type="checkbox"
                      name="showpassword"
                      onClick={() => setshowpassword(!showpassword)}
                      checked={showpassword}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="text-xs text-red-500 font-protest ml-6">
                    <ErrorMessage name="password" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center  ">
                <Button naam="Login" />
              </div>
            </Form>
          </Formik>
          <div className="flex justify-center items-center">
            <p className="text-white">
              Dont't have an account{" "}
              <Link className="text-blue-500 underline" to={"/register"}>
                register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
