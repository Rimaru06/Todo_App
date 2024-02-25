import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios , {AxiosResponse}from "axios";
import Button from "./Button";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
});
const Register = () => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSumbit = async () => {
    try {
        const res : AxiosResponse  = await axios.post("http://localhost:8080/user/signup",register);
        if (res.status === 200) {
            toast.success("Register Success"); 
              navigate("/login"); 
        }
        else
        {
            toast.error("Register Failed");
        }
    } catch (error : any) {
        console.log(error)
         toast.error(`${error.response.data}`);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-black h-screen w-screen flex flex-col justify-center items-center">
        <div className="w-[22rem] h-[35rem] md:w-[30rem] md:h-[35rem] shadow-2xl">
          <div className="flex flex-col justify-center items-center gap-2 h-[10%] ">
            <h1 className="text-white font-extrabold text-lg md:text-3xl">
              Create Your Account
            </h1>
            <p className="text-white font-semibold text-xs md:text-md">
              Already have an account{" "}
              <Link className="underline text-blue-500" to="/login">
                Login
              </Link>
            </p>
          </div>
          <div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                setRegister(values);
              }}
            >
              <Form className="flex flex-col items-center gap-2 h-[90%] ">
                <div className="flex flex-col  gap-1 w-[18rem] md:w-[25rem]   h-[5rem] ">
                  <label className="text-white" htmlFor="firstName">
                    Firstname
                  </label>
                  <Field
                    className="w-full md:h-8 rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    name="firstName"
                  />
                  <div className="text-xs text-red-500">
                    <ErrorMessage name="firstName" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[18rem] md:w-[25rem] h-[5rem]  ">
                  <label className="text-white" htmlFor="lastName">
                    Lastname
                  </label>
                  <Field
                    className="w-full md:h-8 rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    name="lastName"
                  />
                  <div className="text-xs text-red-500">
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[18rem] md:w-[25rem] h-[5rem]  ">
                  <label className="text-white" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="w-full md:h-8 rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="email"
                    name="email"
                  />
                  <div className="text-xs text-red-500">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[18rem] md:w-[25rem] h-[5rem] ">
                  <label className="text-white" htmlFor="password">
                    Password
                  </label>
                  <Field
                    className="w-full md:h-8 rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                  />
                  <div className="text-xs text-red-500">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[18rem] md:w-[25rem] h-[5rem] ">
                  <label className="text-white" htmlFor="confirmPassword">
                    Confirm Your Password
                  </label>
                  <Field
                    className="w-full md:h-8 rounded-md shadow-md pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    name="confirmPassword"
                  />
                  <div className="text-xs text-red-500">
                    <ErrorMessage name="confirmPassword" />
                  </div>
                </div>
                <div className="flex justify-center items-center w-[18rem] md:w-[25rem] ">
                  <Button naam="Register" handleClick={handleSumbit} />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
