import React from "react";
import { FaHome } from "react-icons/fa";
import { useTitle } from "../hooks/useTitle";

const DirectMessage = () => {
  useTitle("Direct Message");
  return (
    <section
      className="pl-64 pt-10 dark:bg-dark"
      style={{ height: "550px", marginTop: "4rem" }}
    >
      <div className="flex flex-col mt-10 pt-20 text-center justify-between">
        <h1 className="text-2xl dark:text-white text-black">
          Direct Message Page Is Under Construction
        </h1>
      </div>
    </section>
  );
};

export default DirectMessage;
