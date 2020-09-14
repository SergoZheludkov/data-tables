import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { maxPageNumberSelector } from '../selectors';
import { nextPage, prevPage } from '../slices';
// ------------------------------------------------------------------------------------------
// div with information about number page and with buttons controlling the table page
const mapStateToPropsForTableControl = (state) => ({
  currentPageNumber: state.table.settings.currentPageNumber,
  maxPageNumber: maxPageNumberSelector(state.navbar.selectedTab)(state),
});
const actionCreatorsForTableControl = { nextPage, prevPage };
const TableControl = (props) => {
  const {
    currentPageNumber,
    maxPageNumber,
    prevPage: prev,
    nextPage: next,
  } = props;
  const handlerPrevClick = (event) => {
    event.preventDefault();
    prev();
  };
  const handlerNextClick = (event) => {
    event.preventDefault();
    next();
  };
  const prevDisabled = currentPageNumber < 2;
  const nextDisabled = currentPageNumber >= maxPageNumber;
  return (
    <div className="d-flex justify-content-between align-items-center p-2 border">
      <Button
        onClick={handlerPrevClick}
        variant="primary"
        disabled={prevDisabled}
      >
        Prev
      </Button>
      <div className="flex-grow-1 text-center">{currentPageNumber} of {maxPageNumber}</div>
      <Button
        onClick={handlerNextClick}
        variant="primary"
        disabled={nextDisabled}
      >
        Next
      </Button>
    </div>
  );
};
export default connect(
  mapStateToPropsForTableControl,
  actionCreatorsForTableControl,
)(TableControl);
