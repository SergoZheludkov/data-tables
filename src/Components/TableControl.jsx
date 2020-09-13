import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { maxPageNumberSelector } from '../selectors';

import {
  nextPage,
  prevPage,
  changeNumberOfRowsDisplayed,
} from '../slices';
// ------------------------------------------------------------------------------------------
const mapStateToPropsForTheNumberOfRows = (state) => ({
  numberOfRowsDisplayed: state.tableBox.settings.numberOfRowsDisplayed,
  rowsDisplayOptions: state.tableBox.settings.rowsDisplayOptions,
});
const actionCreatorsForTheNumberOfRows = { changeNumberOfRowsDisplayed };
const ButtonsControlTheNumberOfRows = (props) => {
  const {
    numberOfRowsDisplayed,
    rowsDisplayOptions,
    changeNumberOfRowsDisplayed: changeNumber,
  } = props;
  const handlerChangeNumbersOfRows = (numberOfRows) => (event) => {
    event.preventDefault();
    changeNumber({ numberOfRows });
  };
  return (
    <div className="p-2 border-right border-bottom">
      <div className="text-center">Select row count</div>
      <ButtonGroup aria-label="Basic example">
      {rowsDisplayOptions.map((option) => (
        <Button
          onClick={handlerChangeNumbersOfRows(option)}
          key={option}
          active={option === numberOfRowsDisplayed}
          variant="secondary"
        >
          {option}
        </Button>
      ))}
      </ButtonGroup>
    </div>
  );
};
export const ButtonsControlTheNumberOfRowsBox = connect(
  mapStateToPropsForTheNumberOfRows,
  actionCreatorsForTheNumberOfRows,
)(ButtonsControlTheNumberOfRows);
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
export const PageControlBox = connect(
  mapStateToPropsForTableControl,
  actionCreatorsForTableControl,
)(TableControl);
