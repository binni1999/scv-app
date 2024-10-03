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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
const UserContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (contactId) => {
    navigate(`/update-contact/${contactId}`);
  };

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/user?query=${query}&page=1`);
      const data = await res.json();
      setContacts(data.users);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setLoading(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults();
    //navigate(`/view-contact?q=${seachValue}`);
  };
  return (
    <>
      <div className="sm:pl-64  ml-10 pt-20" style={{ height: "1000px" }}>
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
                      <svg
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
                      </svg>
                    </div>
                    <input
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
                <tbody>
                  {loading ? (
                    <p>Loading</p>
                  ) : (
                    <div>
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
                    </div>
                  )}
                </tbody>
              </table>
              {/* Modal */}
              {showModal && modalContact && (
                <div class="relative p-4">
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
                      <div class="p-4 flex flex-col justify-center items-center space-y-2">
                        <img
                          id="contact_image"
                          class="w-32 h-32 rounded-full"
                          src={modalContact.picture}
                          alt={modalContact.name}
                        />
                        <h3
                          id="contact_name"
                          class="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                          {modalContact.name}
                        </h3>

                        <p
                          class="text-gray-600 dark:text-gray-300"
                          id="contact_email"
                        >
                          {modalContact.email}
                        </p>
                        <p
                          class="text-gray-600 dark:text-gray-300"
                          id="contact_phone"
                        >
                          {modalContact.phone}
                        </p>
                      </div>
                      <div class="p-2 md:p-3 space-y-2">
                        <div class="relative overflow-x-auto">
                          <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <SiHomeadvisor />
                                </th>
                                <td class="px-6 py-4">
                                  <span id="contact_about">
                                    {modalContact.address}
                                  </span>
                                </td>
                              </tr>

                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FcAbout className="w-4 h-4" />
                                </th>
                                <td class="px-6 py-4">
                                  <span id="contact_about">
                                    {modalContact.description}
                                  </span>
                                </td>
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {modalContact.favourite ? (
                                    <MdFavorite className="w-4 h-4" />
                                  ) : (
                                    <MdFavoriteBorder className="w-4 h-4" />
                                  )}
                                </th>
                                <td class="px-6 py-4">
                                  <span id="contact_favorite">
                                    {`This is your ${
                                      modalContact.favourite
                                        ? "favourite "
                                        : "not favourite "
                                    } contact`}
                                  </span>
                                </td>
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FaEarthAfrica className="w-4 h-4" />
                                </th>
                                <td class="px-6 py-4">
                                  <a
                                    href={modalContact.websiteLink}
                                    id="contactwebsite"
                                  >
                                    {modalContact.websiteLink}
                                  </a>
                                </td>
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <FaLinkedin className="w-4 h-4" />
                                </th>
                                <td class="px-6 py-4">
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
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserContacts;
