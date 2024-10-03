import React from "react";
import { useTitle } from "../hooks/useTitle";

const FeedbackPage = () => {
  useTitle("FeedBack");
  return (
    <section
      className="pl-64 pt-10 dark:bg-dark"
      style={{ height: "550px", marginTop: "4rem" }}
    >
      <div className="flex flex-col mt-10 pt-20 text-center justify-between">
        <h1 className="text-2xl dark:text-white text-black">
          Feedback Page Is Under Construction
        </h1>
      </div>
    </section>
  );
};

export default FeedbackPage;
