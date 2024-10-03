import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const year = new Date().getFullYear();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <footer
        className={`${`bg-white text-center  m-10 p-8 dark:bg-dark`} ${
          userInfo ? "md:pl-60" : ""
        }`}
      >
        <div>
          <span className="inline-block md:w-[500px]  h-[1px] bg-gray-500 rounded-full"></span>
        </div>
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center space-x-12 justify-center">
          <span className="text-md text-gray-500 sm:text-center dark:text-gray-400">
            © {year} &nbsp;
            <a href="/" className="hover:underline">
              Smart Contact Vault
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap space-x-3 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-center">
            <li>
              <a
                href="https://www.instagram.com/pnkj.in?igsh=ZzczYXkzczF1M3hi"
                rel="noreferrer"
                target="_blank"
              >
                <FaInstagram style={{ fontSize: "1.5rem", color: "red" }} />
              </a>
            </li>
            <li>
              <a href="https://x.com/" rel="noreferrer" target="_blank">
                <FaTwitter style={{ fontSize: "1.5rem", color: "blue" }} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/binni1999"
                rel="noreferrer"
                target="_blank"
              >
                <FaGithub className="text-black dark:text-white text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
