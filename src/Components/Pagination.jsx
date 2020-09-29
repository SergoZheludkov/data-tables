import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { maxPageNumberSelector } from '../selectors';
import { setCurrentPageNumber } from '../slices/paginationSlice';
// ------------------------------------------------------------------------------------------
// div with information about number page and with buttons controlling the table page
const offset = 1;
const TableControl = () => {
  const currentPageNumber = useSelector((state) => state.pagination.currentPageNumber) - offset;
  const maxPageNumber = useSelector(
    (state) => maxPageNumberSelector(state.navbar.selectedTab)(state),
  );
  const dispatch = useDispatch();
  const handlePageChange = (data) => {
    const pageNumber = data.selected + offset;
    dispatch(setCurrentPageNumber({ pageNumber }));
  };
  return (
    <div className="d-flex justify-content-center align-items-center p-2 border">
      <ReactPaginate
        forcePage={currentPageNumber}
        pageCount={maxPageNumber}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        previousLabel="prev"
        nextLabel="next"
        containerClassName={'pagination mb-0'}
        // ------------------------------------
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        // ------------------------------------
        activeClassName={'active'}
        disabledClassName={'disabled'}
      />
    </div>
  );
};
export default TableControl;
