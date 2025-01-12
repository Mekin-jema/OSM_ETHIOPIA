import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import OAuth from "../Components/OAuth";
import * as Yup from "yup";
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("invalid email")
    .required("Please enter  your email"),
  password: Yup.string().required("Please enter your passowrd").min(6),
  cpassowrd: Yup.string().oneOf([Yup.ref("passowrd")], "Passowrd is not mutch"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "", cpassword: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, cpassword }) => {
      // console.log(email, password);
      const data = { email, password };
      // await login(data);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen mt-0 bg-gray-100 dark:bg-gray-900 ">
      {/* {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert> */}
      {/* )} */}
      <div className="flex p-3 max-w-full mx-auto flex-col md:flex-row md:items-center gap-20 mt-0">
        {/* left side  */}
        <div className="flex-1">
          <div className="bg-[url('/img2.png')] bg-cover bg-center w-full h-screen bg-transparent"></div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <div className="max-w-96 flex flex-col gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-center text-[30px] text-primary font-bold dark:text-white">
              Create Account
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <TextInput
                  type="text"
                  placeholder="Organization Name"
                  id="username"
                  value={values.name}
                  onChange={handleChange}
                  className={`${
                    errors.name && touched.name && "border-red-500 "
                  } `}
                />
                {errors.name && touched.name && (
                  <span className="text-red-500 pt-2 block">{errors.name}</span>
                )}
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  className={` ${
                    errors.email && touched.email && "border-red-500 "
                  } bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg`}
                />
                {errors.email && touched.email && (
                  <span className="text-red-500 pt-2 block">
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
                />
                {errors.password && touched.password && (
                  <span className="text-red-500 pt-2 block">
                    {errors.password}
                  </span>
                )}
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  onChange={handleChange}
                  value={values.cpassword}
                  className={` ${
                    errors.cpassword && touched.cpassword && "border-red-500 "
                  } bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg`}
                />
                {errors.cpassword && touched.cpassword && (
                  <span className="text-red-500 pt-2 block">
                    {errors.cpassword}
                  </span>
                )}
              </div>
              <br />
              <Button
                type="submit"
                // disabled={loading}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-90"
              >
                Create Account
                {/* {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pt-3">Loading...</span>
                  </>
                ) : (
                )} */}
              </Button>
              <div className="text-center">
                <span>Or</span>
              </div>
              <OAuth />
            </form>
          </div>
          <div className="flex gap-2 text-sm mt-5 text-gray-700 dark:text-gray-300">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-700 dark:text-blue-400">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
