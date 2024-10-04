import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { ImUsers } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logoutUser } from "../services/authService";
import Swal from "sweetalert2";
import { logout } from "../slice/authSlice";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [user, setUser] = useState({});
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if screen is mobile size
  const sidebarRef = useRef(null); // Ref for sidebar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await getUserProfile();
      if (userProfile) {
        setUser(userProfile);
      }
    };
    getProfile();
  }, []);

  // Function to handle logout
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

  // Handle clicks outside of the sidebar to close it on mobile

  // Detect if the screen size changes and update `isMobile`

  return (
    <>
      <aside
        ref={sidebarRef} // Attach the ref to sidebar
        id="logo-sidebar"
        className={`asideSmooth fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 ${`sidebar ${
          isSidebarOpen ? "open" : ""
        }`}`}
        aria-label="Sidebar"
      >
        <div className="text-end">
          <button
            onClick={toggleSidebar}
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 toggleHamburger asidebar"
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
        </div>
        <div className="h-full pt-16 px-3 py-4 overflow-y-auto">
          <Link to="/" className="flex flex-col items-center ps-2.5 mb-8">
            <img
              src={user.profilePic}
              className="md:h-24 md:w-24 h-24 w-24 shadow-md object-cover  rounded-full"
              alt={user.name}
            />

            <span className="text-gray-500">Pankaj Binwal</span>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-black">
              Welcome to SCV
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RxDashboard className="text-2xl" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ImProfile className="text-2xl text-gray-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-green-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Manage
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-contact"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaPlus className="text-2xl text-gray-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Add Contact
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/view-contact"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ImUsers className="text-2xl text-gray-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Contacts</span>
              </Link>
            </li>
            <li>
              <Link
                to="/direct-message"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Direct Message
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/feedback"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Zm4.573 10.673-3.397-.681a.987.987 0 0 0-.444.045L3 16l.963-2.732a.988.988 0 0 0-.015-.634L3.27 9.54l7.363-7.364 3.905 3.906-7.365 7.363Zm9.405-9.406L15.67.754a2.945 2.945 0 0 0-3.872-.29l1.986 2.282 3.905 3.905c.735-1.058.67-2.574-.71-3.87Zm-5.572 8.998L6.256 6.116 3.271 9.102l1.226 2.228 3.905 3.906 2.227 1.226ZM2.729 17.98l3.396-.681-1.632-1.632-.681 3.396Zm10.938-5.572 3.906 3.905 2.281 1.986a2.94 2.94 0 0 0-.229-1.851l-.681-3.396-3.905-3.905-1.986-2.281a2.94 2.94 0 0 0 1.85.227 2.96 2.96 0 0 0 1.636 3.257l-.682 3.397Zm0 0Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Feedback</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
