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
    const maxVisiblePages = 10;
    const startPage =
        currentPage > Math.ceil(maxVisiblePages / 2)
            ? Math.max(
                  Math.min(
                      currentPage - Math.floor(maxVisiblePages / 2),
                      totalPages - maxVisiblePages + 1,
                  ),
                  1,
              )
            : 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
    );

    return (
        <nav>
            <ul className="pagination">
                <li onClick={handlePrevious}>&laquo;</li>
                {pages.map((page) => (
                    <li
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={{
                            cursor: "pointer",
                            fontWeight:
                                currentPage === page ? "bold" : "normal",
                        }}
                    >
                        {page}
                    </li>
                ))}
                <li onClick={handleNext}>&raquo;</li>
            </ul>
        </nav>
    );
};

export default Pagination;
