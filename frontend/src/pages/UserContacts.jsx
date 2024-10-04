import React, { useEffect, useState } from "react";
import { SiHomeadvisor } from "react-icons/si";
import { FcAbout } from "react-icons/fc";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaEarthAfrica } from "react-icons/fa6";
import Sidebar from "../screen/Sidebar";
import { FaEye, FaLinkedin, FaPen, FaPhone, FaTrash } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import Pagination from "../components/Pagination";

import {
  deleteContact,
  getUserContacts,
  searchUserContacts,
} from "../services/contactService";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import { useTitle } from "../hooks/useTitle";

const UserContacts = () => {
  useTitle("Contacts");
  const { curPage } = useParams();
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("q");
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContact, setModalContact] = useState({});
  const [seachValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(curPage) || 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getContacts = async () => {
      let contactsData;
      if (searchTerm) {
        contactsData = await getUserContacts(curPage, searchTerm);
      } else {
        contactsData = await getUserContacts(curPage, "");
      }
      setContacts(contactsData.contacts);
      setTotalPages(contactsData.pages);
      setPage(contactsData.page);
    };
    getContacts();
    setLoading(false);
  }, [curPage, searchTerm]);

  const handleEdit = (contactId) => {
    navigate(`/update-contact/${contactId}`);
  };
  const deleteHandler = async (contactId) => {
    Swal.fire({
      title: "Are you sure?",
      color: "black",
      text: "Do you really want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteContact(contactId);
        if (data?.message === "contact Deleted Successfully!") {
          Swal.fire({
            title: "Deleted!",
            text: "Contact  has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      }
    });
  };
  const handleviewContact = (contact) => {
    setShowModal(true);
    setModalContact(contact);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue("");
    navigate(`/view-contact/page/1/search?q=${seachValue}`);
  };
  const handleClickReset = (e) => {
    e.preventDefault();
    navigate("/view-contact");
  };
  return (
    <>
      <div className="sm:pl-64  md:ml-10 md:pt-20" style={{ height: "650px" }}>
        <div className=" dark:text-white dark:bg-dark">
          <h1 className="text-3xl text-center text-black dark:text-white ">
            All your contacts
          </h1>
          <p className="text-center mt-3">List of all contacts</p>

          <div className="contacts_container pr-4 mt-4 dark:bg-dark">
            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
              <form onSubmit={handleSearch}>
                <div className="flex items-center justify-start flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 space-x-5 bg-white dark:bg-dark">
                  <label for="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center pointer-events-none">
                      {/* <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg> */}
                    </div>
                    <input
                      value={seachValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      name="keyword"
                      type="text"
                      id="table-search-users"
                      className="block p-2   text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for users"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-gray-800 text-white rounded-lg"
                  >
                    Search
                  </button>
                  <button
                    onClick={handleClickReset}
                    className="px-3 py-2 bg-gray-800 dark:bg-red-400 text-white rounded-lg"
                  >
                    Reset
                  </button>
                </div>
              </form>

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Links
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={contact.picture}
                            alt="Jese"
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {contact.name}
                            </div>
                            <div className="font-normal text-gray-500">
                              {contact.email}
                            </div>
                          </div>
                        </th>
                        <td className="px-6  py-4">
                          <div className="flex space-x-1">
                            <span>
                              <FaPhone className="w-4 h-3 mt-1" />
                            </span>
                            <span>{contact.phoneNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {/* //if the contact is fav then green  */}
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                            <a
                              href={contact.websiteLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <PiLinkSimpleBold className="w-5 h-5" />
                            </a>
                            <a
                              href={contact.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaLinkedin className="w-5 h-5" />
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-row space-x-5">
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => deleteHandler(contact._id)}
                            >
                              <FaTrash className="w-4 h-4" />
                            </div>
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => handleEdit(contact._id)}
                            >
                              <FaPen className="w-4 h-4" />
                            </div>
                            <div
                              className="hover:cursor-pointer"
                              onClick={() => {
                                setModalContact(contact);
                                setShowModal(true);
                              }}
                            >
                              <FaEye className="w-4 h-4" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {/* Modal */}
              {showModal && modalContact && (
                <div className="relative p-4">
                  {/* w-full max-w-2xl max-h-full */}
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg  relative md:w-[650px] ">
                      {/* Close Button */}
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                        onClick={() => setShowModal(false)}
                      >
                        <IoCloseSharp className="text-3xl" />
                      </button>

                      {/* Modal Content */}
                      <div className="p-4 flex flex-col justify-center items-center space-y-2">
                        <img
                          id="contact_image"
                          className="w-32 h-32 rounded-full"
                          src={modalContact.picture}
                          alt={modalContact.name}
                        />
                        <h3
                          id="contact_name"
                          className="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                          {modalContact.name}
                        </h3>

                        <p
                          className="text-gray-600 dark:text-gray-300"
                          id="contact_email"
                        >
                          {modalContact.email}
                        </p>
                        <p
                          className="text-gray-600 dark:text-gray-300"
                          id="contact_phone"
                        >
                          {modalContact.phone}
                        </p>
                      </div>
                      <div className="p-2 md:p-3 space-y-2">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <SiHomeadvisor />
                                </th>
                                <td className="px-6 py-4">
                                  <span id="contact_about">
                                    {modalContact.address}
                                  </span>
                                </td>
                              </tr>

                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FcAbout className="w-4 h-4" />
                                </th>
                                <td className="px-6 py-4">
                                  <span id="contact_about">
                                    {modalContact.description}
                                  </span>
                                </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {modalContact.favourite ? (
                                    <MdFavorite className="w-4 h-4" />
                                  ) : (
                                    <MdFavoriteBorder className="w-4 h-4" />
                                  )}
                                </th>
                                <td className="px-6 py-4">
                                  <span id="contact_favorite">
                                    {`This is your ${
                                      modalContact.favourite
                                        ? "favourite "
                                        : "not favourite "
                                    } contact`}
                                  </span>
                                </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FaEarthAfrica className="w-4 h-4" />
                                </th>
                                <td className="px-6 py-4">
                                  <a
                                    href={modalContact.websiteLink}
                                    id="contactwebsite"
                                  >
                                    {modalContact.websiteLink}
                                  </a>
                                </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FaLinkedin className="w-4 h-4" />
                                </th>
                                <td className="px-6 py-4">
                                  <a
                                    href={modalContact.linkedinLink}
                                    id="contact_linkedIn"
                                  >
                                    {modalContact.linkedinLink}
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Pagination Component */}
              <div className="text-center p-5">
                <nav aria-label="Page navigation example">
                  <ul className="inline-flex -space-x-px text-sm">
                    <li>
                      {curPage && curPage > 1 && (
                        <Link
                          to={
                            searchTerm
                              ? `/view-contact/page/${
                                  Number(curPage) - 1
                                }/search?q=${searchTerm}`
                              : `/view-contact/page/${Number(curPage) - 1}`
                          }
                          className="
                           flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </Link>
                      )}
                    </li>

                    <li>
                      <Link className="flex  items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Page {page} of {totalPages}
                      </Link>
                    </li>
                    <li>
                      {curPage || Number(curPage) < totalPages
                        ? Number(curPage) < totalPages && (
                            <Link
                              to={
                                !searchTerm
                                  ? `/view-contact/page/${Number(curPage) + 1} `
                                  : `/view-contact/page/${
                                      Number(curPage) + 1
                                    }/search?q=${searchTerm}`
                              }
                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              &nbsp;&nbsp;Next&nbsp;&nbsp;
                            </Link>
                          )
                        : totalPages > 1 && (
                            <Link
                              to={`/view-contact/page/2`}
                              disabled={
                                currentPage === totalPages ||
                                Number(curPage) === totalPages
                              }
                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              &nbsp;&nbsp;Next&nbsp;&nbsp;
                            </Link>
                          )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserContacts;
