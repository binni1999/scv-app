import React from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../hooks/useTitle";
const ContactUs = () => {
  useTitle("Contact-Us");
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section
      className={`${userInfo ? "md:mt-10 md:pt-10 md:pl-64 " : "md:pl-20"}`}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-3 md:col-span-3 lg:col-span-3"></div>
        <div className="col-span-6 md:col-span-6">
          <div className="mt-10 dark:text-white text-black font-semibold justify-center text-center contactUs">
            <h2 className="text-2xl">Contact Us</h2>
            <p className="dark:text-gray-500 mt-3">
              Lorem ipsum dolor sit amet. Lorem, ipsum dolor.{" "}
            </p>
          </div>
          <div className="mt-12  justify-center">
            <form>
              <div className="flex flex-col md:flex-row md:space-x-10">
                <div className="w-full">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Email"
                    required
                  />
                </div>
              </div>
              <div className="mt-8 mb-8">
                <label
                  for="about"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="about"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write here..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
