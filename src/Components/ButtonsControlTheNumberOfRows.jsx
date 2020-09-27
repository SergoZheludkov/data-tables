import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { changeNumberOfRowsDisplayed } from '../slices/tableSlice';

const mapStateToPropsForTheNumberOfRows = (state) => ({
  numberOfRowsDisplayed: state.table.settings.numberOfRowsDisplayed,
  rowsDisplayOptions: state.table.settings.rowsDisplayOptions,
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
    <div className="align-self-end p-2 border-right border-bottom">
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
export default connect(
  mapStateToPropsForTheNumberOfRows,
  actionCreatorsForTheNumberOfRows,
)(ButtonsControlTheNumberOfRows);
