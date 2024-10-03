import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import {
  createContact,
  deleteContact,
  getContactInfo,
  updateContact,
} from "../services/contactService";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const UpdateContact = () => {
  const { contactId } = useParams();
  console.log(`contact id`, contactId);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [picture, setPicture] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [initialFileName, setInitialFileName] = useState("initial");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose file");

  // const onFileChange = (e) => {
  //   console.log("e target =>", e.target.files);
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  //   console.log(`file=>`, file);
  //   console.log(`filename=>`, filename);
  // };
  useEffect(() => {
    const getContact = async () => {
      const contact = await getContactInfo(contactId);
      if (contact) {
        setName(contact.name);
        setEmail(contact.email);
        setPhoneNumber(contact.phoneNumber);
        setAddress(contact.address);
        setDescription(contact.description);
        setWebsiteLink(contact.websiteLink);
        setLinkedinLink(contact.linkedinLink);
        setPicture(contact.picture);
        setInitialFileName(contact.picture);
        setFilename(contact.picture);
        setFavourite(contact.favourite);
      }
    };
    getContact();
  }, [contactId, initialFileName]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true); //set Loading true
    const data = {
      name,
      email,
      phoneNumber,
      description,
      address,
      websiteLink,
      linkedinLink,
      favourite,
    };
    const formData = new FormData();
    formData.append("file", file);
    try {
      if (initialFileName === filename) {
        data.picture = initialFileName;

        const response2 = await updateContact(contactId, data);
        if (response2) {
          toast.success("Contact Updated Successfully!");
        }
      } else {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          data.picture = response?.data?.file;
          const response2 = await updateContact(contactId, data);
          if (response2) {
            toast.success("Contact Updated Successfully!");
          }
        }
      }
    } catch (err) {
      toast.error("Something went wrong while updating contact details.");
      console.log(err);
    }
    setLoading(false); //stop loading once API call done
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setDescription("");
    setWebsiteLink("");
    setLinkedinLink("");
    setPicture("");
    setFavourite(false);
  };

  return (
    <>
      <div className="md:pl-64 md:ml-10 md:pt-20">
        <div className="pl-3">
          <Link to={"/view-contact"}>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Go Back
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-12">
          <div className="md:col-span-2.5 "></div>
          <div className="col-span-12 pl-20 md:col-span-7">
            <div className="card block p-6 bg-white dark:text-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h1 className="text-2xl font-semibold text-black dark:text-white">
                Update Contact
              </h1>
              <p className="text-gray-400">
                This contact will be stored on cloud, you can direct email this
                client from scv
              </p>

              <form
                className="mt-8"
                onSubmit={handleSubmitForm}
                encType="multipart/form-data"
              >
                {/* name form */}
                <div className="mb-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter contact name"
                  />
                </div>
                {/* Email form */}
                <div className="mb-2">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                  />
                </div>
                {/* Phone form */}
                <div className="mb-2">
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter contact number"
                  />
                </div>

                {/* Address form */}
                <div className="mb-2">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Address
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter contact address"
                  ></textarea>
                </div>

                {/* Description form */}
                <div className="mb-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="write about your contact"
                  ></textarea>
                </div>
                {/* social links */}
                <div className="flex space-x-2 mb-2">
                  <div className="w-full">
                    {/* Website link */}
                    <div className="mb-2">
                      <div class="relative mb-6">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FaEarthAfrica />
                        </div>
                        <input
                          type="text"
                          id="website"
                          value={websiteLink}
                          onChange={(e) => setWebsiteLink(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="https://www.binni.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    {/* Linkedin link */}
                    <div className="mb-2">
                      <div class="relative mb-6">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FaLinkedin />
                        </div>
                        <input
                          type="text"
                          id="linkedin"
                          value={linkedinLink}
                          onChange={(e) => setLinkedinLink(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="https://www.linkedin.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* add image profile pic */}
                <div className="mb-3">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="small_size"
                  >
                    Contact Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setFilename(e.target.files[0].name);
                    }}
                    className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="small_size"
                  />
                </div>

                {/* Favcheckbox */}
                <div className="mb-3">
                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={favourite}
                      onChange={(e) => setFavourite(e.target.checked)}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Is this contact your favourite one?
                    </label>
                  </div>
                </div>
                <div className="button-container text-center space-x-2">
                  <button
                    type="submit"
                    className="px-3 py-2 rounded dark:bg-blue-600 hover:dark:bg-blue-800 bg-gray-800 text-white hover:bg-gray-600"
                  >
                    {loading && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {loading ? "Adding..." : "Add Contact"}
                  </button>
                  <button
                    onClick={resetForm}
                    type="reset"
                    className="px-3 py-2 rounded bg-red-600 text-white dark:bg-red-600 hover:dark:bg-red-800 hover:bg-red-500"
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

export default UpdateContact;
