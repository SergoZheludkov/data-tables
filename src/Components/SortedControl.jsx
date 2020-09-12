import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { sortReset, removeSortedType } from '../slices';
import { closeIcon, rightArrow } from './icons';

const mapStateToPropsForSortedSettList = (state) => ({
  settings: state.tableBox.sort,
});
const actionCreatorsForListSettingSort = { removeSortedType };
const ListSettingSort = ({ settings, removeSortedType: remove }) => {
  const { order, type } = settings;
  const handlerClose = (head) => (event) => {
    event.preventDefault();
    remove({ type: head });
  };
  const settingDivs = order.map((head, i) => (
    <React.Fragment key={`sortControl-${head}`}>
    {i !== 0 && <div className="p-1 mx-1">{rightArrow}</div>}
    <div
      className="border p-1 mx-1 rounded-lg"
    >
      <span><b>{head}</b>-{type[head]}</span>
      <span onClick={handlerClose(head)}>
        {closeIcon}
      </span>
    </div>
    </React.Fragment>
  ));
  const displayedSort = settingDivs.length > 0 ? settingDivs : <div className="mx-2">Not Sorted</div>;
  return (
    <div className="d-flex align-items-center">
      <div>Sorted by:</div>
      {displayedSort}
    </div>);
};
const ListSettingSortBox = connect(
  mapStateToPropsForSortedSettList,
  actionCreatorsForListSettingSort,
)(ListSettingSort);

const actionCreatorsForSortedInfo = { sortReset };
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
      <ListSettingSortBox />
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
  mapStateToPropsForSortedSettList,
  actionCreatorsForSortedInfo,
)(SortedControl);

export default SortedControlBox;
