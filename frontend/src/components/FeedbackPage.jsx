import React from "react";
import { useTitle } from "../hooks/useTitle";

const FeedbackPage = () => {
  useTitle("FeedBack");
  return (
    <section
      className="md:pl-64 md:pt-10 dark:bg-dark"
      style={{ height: "550px", marginTop: "5rem" }}
    >
      <div className="flex flex-col md:mt-10 md:pt-20 text-center justify-between">
        <h1 className="text-2xl mt-10 dark:text-white text-black">
          Feedback Page Is Under Construction
        </h1>
      </div>
    </section>
  );
};

export default FeedbackPage;
