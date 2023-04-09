import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePageClick = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${
                            currentPage === number ? "active" : ""
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
