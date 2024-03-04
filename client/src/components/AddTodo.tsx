import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import Button from "./Button";
import axios from "axios";

const todoSchema = Yup.object().shape({
  title: Yup.string().required("Enter the title"),
  description: Yup.string().max(40).required("enter upto 40 words"),
});
const AddTodo = () => {
  const handleSumbit = async (todo : {
    title: string,
    description: string
  
  }) => {

    try {
      const res = await axios({
        url: "http://localhost:8080/user/addTodo",
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: {
          title: todo.title,
          description: todo.description,
        },
      });
      if (res.status === 200) {
        toast.success("Todo added succesfully")
      }
    } catch (error) {
       toast.error("Todo Addition failed");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-full  flex justify-center items-center ">
        <div className="w-96 h-96 md:w-[70%] md:h-[50%] xl:w-[40%] xl:h-[50%] shadow-2xl rounded-sm    ">
          <div className="flex justify-center items-center w-full h-[20%] text-2xl font-bold">
            <h1 className="text-white">ADD TODO</h1>
          </div>
          <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={todoSchema}
            onSubmit={(values) => {
              handleSumbit(values);
            }}
          >
            <Form className="h-[80%] flex flex-col justify-center items-center    ">
              <div className="flex flex-col w-[80%]  h-[30%]  ">
                <label className="text-white" htmlFor="title">
                  Title
                </label>
                <Field
                  className="h-[40%] rounded-md pl-3 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent "
                  type="text"
                  name="title"
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="title" />
                </div>
              </div>

              <div className="flex flex-col w-[80%] h-[30%] ">
                <label className="text-white" htmlFor="description">
                  Description
                </label>
                <Field
                  className="h-[40%] rounded-md pl-3 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="description"
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="flex justify-center items-center w-[80%] h-[30%]">
                <Button naam="ADD" />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
