import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(login);
    toast.success("Login Success");
  };
  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center bg-black ">
        <div className="= h-[35vh] sm:h-[40vh] sm:w-[50vw]   lg:h-[30vh] lg:w-[40vw] xl:h-[50vh] xl:w-[30vw]  shadow-2xl rounded-md flex flex-col gap-2">
          <div className="flex justify-center">
            <h1 className="text-[2rem] sm:text-[4rem] font-protest text-white">
              Signin
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              setLogin(values);
              handleSubmit();
            }}
          >
            <Form className="grid grid-cols-1 w-full h-full gap-2 ">
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
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
                <div className="flex flex-col">
                  <label className="font-protest text-white" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="border-2 border-black w-[20rem] h-[2.5rem] rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="text-xs text-red-500 font-protest">
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
              Dont't have an account <Link className="text-blue-500 underline" to={"/register"}>register</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
