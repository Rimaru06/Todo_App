import { Formik, Field, Form } from "formik";
const Search = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className=" w-full h-[10%] border-b-2 ">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="w-full h-full flex justify-evenly items-center   ">
            <Field className="w-[60%] h-[50%] rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 pl-5" type="search" name="search" placeholder="search" />
            <div>
              <button className="w-24 md:w-36 text-white border-2 h-[6vh] bg-blue-500 rounded-md shadow-2xl border-black font-mono text-lg " type="submit" >
                Search
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Search;
