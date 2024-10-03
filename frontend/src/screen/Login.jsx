import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredential } from "../slice/authSlice";
const Login = () => {
  useTitle(`Login`);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await login({ email, password });
    if (!data) {
      // Handle other potential errors or unexpected data shapes
      return toast.error("An unexpected error occurred");
    }
    if (data.message) {
      return toast.error(data.message);
    }
    toast.success("Logged in Successfully!");
    dispatch(setCredential({ ...data }));
    navigate("/profile");
  };

  return (
    <>
      <div id="content" className="mt-20 mb-20 ">
        <div className="grid grid-cols-12">
          <div className="col-span-4 md:col-span-2 lg:col-span-3 xl:col-span-4"></div>
          <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4">
            <div
              href="/"
              className="block  p-6  border-t-[8px] border-green-500  bg-white border = rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-blue-500 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Login Here
              </h5>
              <p className="font-normal text-gray-400 dark:text-gray-400">
                Start managing contacts on cloud..
              </p>
              <form onSubmit={submitHandler} className="mt-2">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="pankaj@binni.com"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-3 mt-4  flex justify-center space-x-5">
                  <button
                    type="submit"
                    className="px-3 py-2 rounded bg-gray-800 text-white dark:bg-blue-500 dark:hover:bg-blue-900 hover:bg-gray-900"
                  >
                    Login
                  </button>
                  <button
                    type="reset"
                    className=" px-3 py-2 rounded bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-800 hover:bg-red-800"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
