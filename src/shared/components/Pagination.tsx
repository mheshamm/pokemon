import React, { useMemo } from "react";

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pager = useMemo(() => {
    if (totalPages <= 1) return [];

    const pagesToShow = 4;
    let start: number;

    if (totalPages <= pagesToShow) {
      start = 1;
    } else if (currentPage <= Math.ceil(pagesToShow / 2)) {
      start = 1;
    } else if (currentPage + Math.floor((pagesToShow - 1) / 2) >= totalPages) {
      start = totalPages - (pagesToShow - 1);
    } else {
      start = currentPage - Math.floor(pagesToShow / 2);
    }

    return Array.from({ length: Math.min(pagesToShow, totalPages) }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <ul className="pagination">
      {/* Prev */}
      <li>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        >
          {'<'}
        </button>
      </li>

      {/* Pages */}
      {pager.map((number) => (
        <li key={number}>
          <button
            onClick={() => paginate(number)}
            className={`pagination-btn ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        </li>
      ))}

      {/* Next */}
      <li>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
