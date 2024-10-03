import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getUserProfile } from "../services/authService";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserProfile();
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phoneNumber);
      setAbout(userData.about);
      setImage(userData.profilePic);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="sm:pl-64 md:pt-10" style={{ height: "600px" }}>
        <div className="flex items-center justify-center md:pt-32 flex-col">
          <div className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex flex-col items-center">
              <img
                src="path/to/profilePic.jpg"
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
          <div className="mt-2 pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
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

                  <form className="max-w-md mx-auto">
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
                    <div className="relative z-0 w-full mb-5 group">
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
                          className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="small_size"
                          type="file"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <img
                          className="w-32 h-32 rounded-full shadow-lg object-cover "
                          src={
                            image
                              ? image
                              : "https://images.pexels.com/photos/9985720/pexels-photo-9985720.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                          alt="img"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
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
