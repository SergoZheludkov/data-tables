import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { sortReset, removeSortedType } from '../slices';
import { closeIcon, rightArrow } from './icons';

const mapStateToPropsForListSettigsOfSort = (state) => ({ settings: state.sorting });
const actionCreatorsForListSettingOfSort = { removeSortedType };

const ListSettingOfSort = (props) => {
  const { settings, removeSortedType: remove } = props;
  const { order, types } = settings;
  const handlerClose = (type) => (event) => {
    event.preventDefault();
    remove({ header: type });
  };
  const settingDivs = order.map((header, i) => (
    <React.Fragment key={`sortedlist-${header}`}>
    {i !== 0 && <div className="p-1 mx-1">{rightArrow}</div>}
    <div className="border p-1 mx-1 rounded-lg">
      <span>
        <b>{header}</b>-{types[header]}
      </span>
      <span onClick={handlerClose(header)}>
        {closeIcon}
      </span>
    </div>
    </React.Fragment>
  ));
  const displayedSorting = settingDivs.length > 0 ? settingDivs : <div className="mx-2">Not Sorted</div>;
  return (
    <div className="d-flex align-items-center">
      <div>Sorted by:</div>
      {displayedSorting}
    </div>);
};
const ListSettingOfSortBox = connect(
  mapStateToPropsForListSettigsOfSort,
  actionCreatorsForListSettingOfSort,
)(ListSettingOfSort);

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
