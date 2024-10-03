import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { CgDarkMode } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTitle } from "../hooks/useTitle";

const UserNavbar = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  useTitle(userInfo.name);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logoutHandler = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        color: "black",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout!",
        cancelButtonText: "No, keep it",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        padding: "5px",
        customClass: {
          title: "swal2-responsive-title",
          content: "swal2-responsive-content",
          actions: "swal2-responsive-actions",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logoutUser();
          dispatch(logout());
          toast.success("User Logged out successfully!");
          navigate("/login");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const profileView = () => {
    navigate("/profile");
  };
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
    <header className="bg-white dark:bg-dark md:pl-60">
      <nav className="bg-white border-gray-900  dark:bg-dark sm:pl-64 fixed w-full top-0 left-0 right-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            onClick={toggleSidebar}
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <a
            href="/"
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
          </a>

          <div className="flex gap-2 md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
            <span
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl mt-2 cursor-pointer text-black dark:text-white"
            >
              <CgDarkMode />
            </span>
            <span className="mt-2 pr-2 dark:text-white text-black font-semibold dark:font-semibold">
              {darkMode ? "Light" : "Dark"}
            </span>
            <Link
              to="/profile"
              type="button"
              className="hidden md:flex  items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {userInfo.name}
              </span>
            </Link>
            <Link
              onClick={logoutHandler}
              type="button"
              className="hidden relative md:inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Logout
              </span>
            </Link>

            <button
              onClick={toggleButton}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            className="items-center z-50 hidden w-full md:flex md:w-auto md:order-1 dark:bg-dark md:pl-40  md:ml-20"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-dark md:dark:bg-dark dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-1 px-2 md:p-0 text-white rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="block py-1 px-2 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>

              <li className="flex flex-row mt-5">
                <button
                  onClick={profileView}
                  class="relative md:hidden flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {userInfo.name}
                  </span>
                </button>

                <button
                  onClick={logoutHandler}
                  class="relative md:hidden flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Logout
                  </span>
                </button>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
