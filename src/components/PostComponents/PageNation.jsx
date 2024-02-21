import React from 'react';

function PageNation({ currentPage, totalPages, onPageChange }) {
    const handlePrevClick = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="align right">
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={handlePrevClick}>
                    이전
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextClick}>
                    다음
                </button>
            </div>
        </div>
    );
}

export default PageNation;
