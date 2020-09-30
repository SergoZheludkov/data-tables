import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { currentPageDataSliceSelector } from '../selectors';
import { setSelectedEmptyId } from '../slices/emptyInfoSlice';

const TableRows = () => {
  const tableHeaders = useSelector((state) => state.table.tableHeaders);
  const currentData = useSelector((state) => (
    currentPageDataSliceSelector(state.navbar.selectedTab)(state)
  ));
  const dispatch = useDispatch();

  if (currentData.length === 0) {
    return (<tr><td colSpan={tableHeaders.length}>None data match</td></tr>);
  }
  const handleClickRow = (id) => (event) => {
    event.preventDefault();
    dispatch(setSelectedEmptyId({ id }));
  };
  return (
    currentData
      .map((person) => (
        <tr key={_.uniqueId()} onClick={handleClickRow(person.id)}>
          {tableHeaders.map((header) => (
            <td key={`p-${person[header]}`}>
              {person[header]}
            </td>
          ))}
      </tr>
      ))
  );
};

export default TableRows;
