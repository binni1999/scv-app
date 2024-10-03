import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages: pages, page }) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [totalPages, setTotalPages] = useState(pages || 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <Link
            disabled={currentPage === 1}
            to={`/view-contact/page/${page - 1}`}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </Link>
        </li>

        <li>
          <Link
            to={`/view-contact/page/${page}`}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Page {page} of {pages}
          </Link>
        </li>
        <li>
          <Link
            to={`/view-contact/page/${page + 1}`}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            &nbsp;&nbsp;Next&nbsp;&nbsp;
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
