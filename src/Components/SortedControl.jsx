import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { sortReset } from '../slices/sortingSlice';
import ListSettingOfSortBox from './ListSettingOfSort';

const SortedControl = () => {
  const settings = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  const handlerReset = (event) => {
    event.preventDefault();
    dispatch(sortReset());
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

export default SortedControl;
