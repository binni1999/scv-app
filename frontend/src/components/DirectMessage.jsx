import React from "react";
import { FaHome } from "react-icons/fa";
import { useTitle } from "../hooks/useTitle";

const DirectMessage = () => {
  useTitle("Direct Message");
  return (
    <section
      className="md:pl-64 md:pt-10  dark:bg-dark"
      style={{ height: "550px", marginTop: "5rem" }}
    >
      <div className="flex flex-col messageClass md:mt-10 md:pt-20 text-center justify-between">
        <h1 className="text-2xl dark:text-white mt-10 text-black">
          Direct Message Page Is Under Construction
        </h1>
      </div>
    </section>
  );
};

export default DirectMessage;
