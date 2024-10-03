import React from "react";
import error from "../../src/assets/error5.JPG";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <section
      className="md:pl-64 text-center mt-12 pt-12 md:ml-12 mr-12"
      style={{ height: "550px" }}
    >
      <div className="flex flex-row text-center justify-center mt-12 pt-20 space-x-10">
        <div>
          <img
            className="mix-blend-color-burn dark:mix-blend-multiply w-50% h-[350px]"
            src={error}
            alt=""
          />
        </div>
        <div className="mt-10">
          <h2 className="text-4xl dark:text-gray-300 text-gray-700 font-bold">
            OOPS! PAGE <br />
            NOT FOUND
          </h2>
          <p className="mt-8 font-semibold  text-gray-600 dark:text-gray-400">
            You must have picked the wrong door <br /> because i haven't been
            able to lay my eye <br /> on the page you have been serarching for.
          </p>
          <Link to={"/"}>
            <button class="relative mt-8   inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                BACK TO HOME
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
