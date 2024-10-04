import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../services/authService";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCredential } from "../slice/authSlice";
import { useTitle } from "../hooks/useTitle";

const Profile = () => {
  useTitle("Profile");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [filename, setFilename] = useState("Change File");
  const [initialFileName, setInitialFileName] = useState("initial");

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserProfile();
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phoneNumber);
      setAbout(userData.about);
      setImage(userData.profilePic);
      setInitialFileName(userData.profilePic);
      setFilename(userData.profilePic);
    };
    getUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const data = {
      name,
      email,
      phoneNumber: phone,
      about,
    };
    await updateUserProfile(data);
    try {
      if (initialFileName === filename) {
        const updatedUser = await updateUserProfile(data);
        if (updatedUser) {
          toast.success("Contact Updated Successfully!");
          dispatch(setCredential({ ...updatedUser.user }));
          setShowModal(false);
        }
      } else {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          data.profilePic = response?.data?.file;
          const newResponse = await updateUserProfile(data);

          if (newResponse) {
            toast.success("Contact Updated Successfully!");
            dispatch(setCredential(newResponse.user));
            window.location.reload();
            setShowModal(false);
          }
        }
      }
    } catch (err) {
      toast.error("Something went wrong while updating contact details.");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="sm:pl-64 md:pt-10" style={{ height: "600px" }}>
        <div className="flex items-center justify-center md:pt-32 flex-col">
          <div className="bg-white profilePage  dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt="ProfilePhoto"
                className="w-44 h-44 rounded-full shadow-lg object-cover mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">
                {name}
              </h2>
              <p className="text-gray-600 mb-2 dark:text-gray-200">{email}</p>
              <p className="text-gray-600 mb-2 dark:text-gray-200">{phone}</p>
              <p className="text-gray-600 mb-4 text-center dark:text-gray-200">
                {about}
              </p>
              <div className="w-full flex justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Email Verified:
                  <span
                    className="font-medium text-gray-700 dark:text-gray-200"
                    id="email-verified"
                  >
                    No
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Phone Verified:
                  <span
                    className="font-medium text-gray-700 dark:text-gray-200"
                    id="phone-verified"
                  >
                    No
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="md:mt-2 profilePageEditButton md:pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="relative  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Edit Profile
              </span>
            </button>
          </div>
          {/* Modal */}
          {showModal && (
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

                  <h2 className="text-xl text-center dark:text-gray-300 text-gray-600">
                    Update Profile
                  </h2>

                  <form
                    onSubmit={handleFormSubmit}
                    className="max-w-md mx-auto"
                  >
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5  group">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="text"
                          name="floating_phone"
                          id="floating_phone"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="floating_phone"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <label
                        for="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        About Yourself
                      </label>
                      <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="small_size"
                        >
                          Profile Picture
                        </label>
                        <input
                          onChange={handleFileChange}
                          className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="small_size"
                          type="file"
                        />
                      </div>
                      <div className=" relative z-0 w-full mb-5 group">
                        <img
                          className="w-32 h-32 rounded-full shadow-lg object-cover "
                          src={
                            filePreview ||
                            image ||
                            "https://images.pexels.com/photos/9985720/pexels-photo-9985720.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                          alt="img"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="relative   inline-flex items-center justify-center p-0.5 mb-2 me-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {loading && (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
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
                        {loading ? "Updating Profile..." : "Update Profile"}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {/* Modal */}
        </div>
      </div>
    </>
  );
};

export default Profile;
