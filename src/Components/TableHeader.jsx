import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSorting } from '../slices/sortingSlice';
import { defaultIcon, upIcon, downIcon } from './icons';

const getCurrentIcon = (sortType) => {
  switch (sortType) {
    case 'asc':
      return downIcon;
    case 'desc':
      return upIcon;
    default:
      return defaultIcon;
  }
};

const Header = () => {
  const tableHeaders = useSelector((state) => state.table.tableHeaders);
  const sortedInfo = useSelector((state) => state.sorting.types);
  const dispatch = useDispatch();
  const handlerChangeSorting = (headType) => (event) => {
    event.preventDefault();
    dispatch(changeSorting({ header: headType }));
  };
  return (tableHeaders
    .map((header) => (
      <th onClick={handlerChangeSorting(header)} key={header}>
        <div className="float-left">
          {header}
        </div>
        <div className="float-right">
          {getCurrentIcon(sortedInfo[header])}
        </div>
      </th>
    ))
  );
};

export default Header;
