import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { descriptionToSortedInfoSelector, maxPageNumberSelector } from '../selectors';
import Search from './Search';
import { nextPage, prevPage } from '../slices';

// ------------------------------------------------------------------------------------------
// div with information about sort and with buttons controlling the number of displayed lines
const mapStateToPropsForSortedInfo = (state) => ({
  description: descriptionToSortedInfoSelector(state),
});
const SortedInfo = (props) => {
  const { description } = props;
  return (
    <div className="d-flex justify-content-between border">
      <div className="d-flex flex-fill justify-content-between align-items-center p-2 border-right">
        {description}
        <Button variant="primary">Reset</Button>
      </div>
      <div className="d-flex justify-content-end p-2 border-right">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">50</Button>
          <Button variant="secondary">100</Button>
          <Button variant="secondary">200</Button>
        </ButtonGroup>
      </div>
      <Search />
    </div>
  );
};
export const SortedInfoBox = connect(mapStateToPropsForSortedInfo)(SortedInfo);
// ------------------------------------------------------------------------------------------
// div with information about number page and with buttons controlling the table page
const mapStateToPropsForTableControl = (state) => ({
  currentPageNumber: state.tableBox.settings.currentPageNumber,
  maxPageNumber: maxPageNumberSelector(state.navbarBox.selectedTab)(state),
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
export const TableControlBox = connect(
  mapStateToPropsForTableControl,
  actionCreatorsForTableControl,
)(TableControl);
