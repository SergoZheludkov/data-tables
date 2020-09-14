import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { sortReset } from '../slices';
import ListSettingOfSortBox from './ListSettingOfSort';

const mapStateToPropsForListSettigsOfSort = (state) => ({ settings: state.sorting });
const actionCreatorsForSortedControl = { sortReset };

const SortedControl = (props) => {
  const {
    sortReset: reset,
    settings,
  } = props;
  const handlerReset = (event) => {
    event.preventDefault();
    reset();
  };
  const resetDisabled = settings.order.length < 1;
  return (
    <div className="d-flex flex-fill justify-content-between align-items-center p-2 border">
      <ListSettingOfSortBox />
      <Button
        onClick={handlerReset}
        disabled={resetDisabled}
        variant="primary"
      >
        Reset
      </Button>
    </div>
  );
};
const SortedControlBox = connect(
  mapStateToPropsForListSettigsOfSort,
  actionCreatorsForSortedControl,
)(SortedControl);

export default SortedControlBox;
