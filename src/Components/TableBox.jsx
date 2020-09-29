import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import { errorsSelector, currentPageDataSliceSelector } from '../selectors';
import Pagination from './Pagination';
import PageSizeButtons from './PageSizeButtons';
import AddEntryControlBox from './AddEntryControl';
import AddEntryForm from './AddEntryForm';
import SortedControlBox from './SortedControl';
import EmptyInfoBox from './EmptyInfoBox';
import Search from './Search';
import HomePage from './HomePage';
import { changeSorting } from '../slices/sortingSlice';
import { setSelectedEmptyId } from '../slices/emptyInfoSlice';
import { defaultIcon, upIcon, downIcon } from './icons';
import loading from '../assets/img/loading.gif';
import Alert from './Alert';

// ------------------------------------------------------------------------------------------
const TableControlBox = () => (
  <div className="d-flex border-right border-left">
    <Search />
    <PageSizeButtons />
    <AddEntryControlBox />
  </div>
);
// ------------------------------------------------------------------------------------------
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
const HeaderBox = Header;
// ------------------------------------------------------------------------------------------
const Rows = () => {
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
const RowsBox = Rows;
// ------------------------------------------------------------------------------------------
const geDataDownloadingStatus = (type) => (state) => state.data.statuses[type];
const TheTable = () => {
  const status = useSelector((state) => (
    geDataDownloadingStatus(state.navbar.selectedTab)(state)
  ));
  const addEntryFormStatus = useSelector((state) => state.addEntryСontrol.status);
  if (status !== 'success') {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <img className="w-25" src={loading}/>
      </div>
    );
  }
  return (
    <>
      <SortedControlBox />
      <TableControlBox />
      { addEntryFormStatus === 'opened' && <AddEntryForm />}
      <Pagination />
      <Table
        striped
        bordered
        hover
        size="sm"
        className="m-0"
      >
        <thead>
          <tr>
            <HeaderBox />
          </tr>
        </thead>
        <tbody>
          <RowsBox />
        </tbody>
      </Table>
      <Pagination />
      <EmptyInfoBox />
    </>
  );
};
const TableBox = TheTable;

const DisplayBox = () => {
  const currentTab = useSelector((state) => state.navbar.selectedTab);
  const error = useSelector((state) => errorsSelector(state.navbar.selectedTab)(state));
  if (error) return <Alert />;
  return (
    <div>
      {currentTab === 'home' && <HomePage />}
      {currentTab !== 'home' && <TableBox />}
    </div>
  );
};

export default DisplayBox;
