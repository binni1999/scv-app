import {} from "react-icons";
import logo from "../assets/logo.png";
import { CgDarkMode } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredential } from "../slice/authSlice";
import { useTitle } from "../hooks/useTitle";
const Header = () => {
  useTitle("Smart Contact Vault");
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await axios.get("/login/success", {
        withCredentials: true,
      });
      if (response?.data) {
        dispatch(setCredential({ ...response.data.user }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  });
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const [openLogo, setOpenLogo] = useState(false);
  const toggleButton = () => {
    setOpenLogo(!openLogo);
    if (openLogo) {
      const data = document.getElementById("navbar-cta");
      data.classList.add("showData");
    } else {
      const data = document.getElementById("navbar-cta");
      data.classList.remove("showData");
    }
  };
  return (
    <header>
      <nav className="bg-white border-gray-900  dark:bg-dark">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-10 dark:bg-gray-100 dark:rounded-full"
              alt="SCV Logo"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-black">
              şc𝕧
            </span>
          </Link>
          <div className="flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <span
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl mt-2 cursor-pointer text-black dark:text-white"
            >
              <CgDarkMode />
            </span>
            <span className="mt-2 dark:text-white text-black font-semibold dark:font-semibold">
              {darkMode ? "Light" : "Dark"}
            </span>
            <button
              onClick={toggleButton}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
              <li>
                <Link
                  to="/contact-us"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
