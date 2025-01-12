import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signinStart, signinFail, signinSuccess } from "../Redux/userSlice";
import OAuth from "../Components/OAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        return;
      }
      dispatch(signinStart());
      // setError(false);
      const data = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await data.json();
      if (response.success === false) {
        dispatch(signinFail(response.message));
        return;
      }
      dispatch(signinSuccess(response));
      navigate("/");
      setFormData({
        password: "",
        email: "",
      });
      console.log(response);
    } catch (error) {
      dispatch(signinFail(error.message));
    }
  };
  return (
    <div className=" min-h-screen mt-20 ">
      {error && (
        <Alert className="mt-5  " color="failure">
          {error}
        </Alert>
      )}
      <div className="flex p-3 max-w-full mx-auto flex-col md:flex-row-reverse md:items-center gap-5 mt-0">
        {/* left side  */}
        <div className="flex-1">
          <div className="bg-[url('/company.png')] bg-cover bg-center w-full h-screen bg-transparent"></div>
        </div>
        {/* right side */}
        <div className="flex-1  ">
          <div className="max-w-96 mx-auto  flex flex-col gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ">
            <h2 className="text-center text-[30px] text-primary font-bold dark:text-white">
              Login
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <TextInput
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-90"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pt-3">Loading...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="text-center">
                <span>Or</span>
              </div>
              <OAuth />
            </form>
          </div>
          <div className="flex gap-2 text-sm mt-5 text-gray-700 dark:text-gray-300 max-w-96  mx-auto ">
            <span> Create New Account</span>
            <Link to="/sign-up" className="text-blue-700 dark:text-blue-400">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
