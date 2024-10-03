import React from "react";
import { FaUser } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { MdContentCut } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTitle } from "../hooks/useTitle";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  useTitle("Home");
  return (
    <>
      <section className="flex flex-col items-center py-12 mt-16">
        <div className="max-w-md w-full sm:m-2 ">
          <img
            className="rounded shadow-lg"
            src="https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="imagename"
          />
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Start Managing your contacts on cloud
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4  md:mx-12 md:px-12 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            maiores debitis voluptates beatae. Culpa molestiae eius maxime
            commodi, consectetur repellat enim deleniti eos. aliquam nesciunt
            iusto praesentium pariatur architecto
          </p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Link to={"/signup"}>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
              Start
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
              Login
            </button>
          </Link>
        </div>
      </section>

      <section className="text-center py-12 m-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Features of SCV
        </h2>
        <p className="text-gray-500 mt-4 dark:text-white">
          Blue bottle crucifix vinyl post-ironic four dollar toast vegan
          taxidermy. <br /> Gastropub indxgo juice poutine, ramps microdosing
          banh mi pug.
        </p>
        <div className="mt-2">
          <span className="inline-block w-12 h-1 bg-purple-500 rounded-full"></span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 text-center">
          <div className=" p-8 rounded-lg ">
            <div className="text-gray-400 mb-4 text-center inline-block rounded-full bg-blue-100 p-2 dark:bg-gray-600">
              <p className="text-center text-gray-600 dark:text-white">
                <CiWavePulse1 className="text-4xl" />
              </p>
            </div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
              Store Contact on Cloud
            </h3>
            <p className="mt-4 text-sm text-gray-500 dark:text-white">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh
              mi pug VHS try-hard.
            </p>
          </div>

          <div className="p-8 rounded-lg ">
            <div className="text-gray-500 mb-4 dark:bg-gray-600 text-center inline-block bg-blue-100 rounded-full p-2">
              <p className="text-center text-gray-600 dark:text-white">
                <MdContentCut className="text-4xl" />
              </p>
            </div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
              Send Direct Email from Here
            </h3>
            <p className="mt-4 text-sm text-gray-500 dark:text-white">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh
              mi pug VHS try-hard.
            </p>
          </div>

          <div className=" p-8 rounded-lg ">
            <div className="text-gray-500 dark:bg-gray-600  mb-4 inline-block text-center rounded-full bg-blue-100 p-2">
              <p className="text-center text-gray-600 dark:text-white">
                <FaUser className="text-4xl" />
              </p>
            </div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
              Easy Export
            </h3>
            <p className="mt-4 text-sm text-gray-500 dark:text-white">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh
              mi pug VHS try-hard.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-10">
        <button className="bg-purple-500 dark:bg-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-purple-600 transition-colors duration-300">
          Lets Start
        </button>
      </section>
    </>
  );
};

export default Home;
