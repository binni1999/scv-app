import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { createContact } from "../services/contactService";
import axios from "axios";
import { toast } from "react-toastify";
import { useTitle } from "../hooks/useTitle";
const Contact = () => {
  useTitle("Add-Contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [picture, setPicture] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose file");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
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
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        data.picture = response?.data?.file;
        const response2 = await createContact(data);
        if (response2) {
          toast.success("Contact Created Successfully!");
        }
      }
    } catch (err) {
      toast.error("Something went wrong while creating contact.");
      console.log(err);
    }
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
        <div className="grid grid-cols-12">
          <div className="md:col-span-2.5 "></div>
          <div className="col-span-12 pl-20 md:col-span-7">
            <div className="card block p-6 bg-white dark:text-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-700">
              <h1 className="text-2xl text-gray-700 font-semibold dark:text-gray-300">
                Add New Contact
              </h1>
              <p className="dark:text-gray-400 text-gray-500">
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
                          <FaEarthAfrica className="text-gray-500 dark:text-gray-300" />
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
                          <FaLinkedin className="text-gray-500 dark:text-gray-300" />
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
                    Add Contact
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

export default Contact;
