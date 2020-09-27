import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import { errorsSelector, currentPageDataSliceSelector } from '../selectors';
import Pagination from './Pagination';
import ButtonsControlTheNumberOfRowsBox from './ButtonsControlTheNumberOfRows';
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
    <ButtonsControlTheNumberOfRowsBox />
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
const mapStateToPropsForTable = (state) => ({
  currentData: currentPageDataSliceSelector(state.navbar.selectedTab)(state),
  tableHeaders: state.table.tableHeaders,
  sortedInfo: state.sorting.types,
});
const actionCreatorsForHeader = { changeSorting };
const Header = (props) => {
  const {
    tableHeaders,
    sortedInfo,
    changeSorting: change,
  } = props;
  const handlerChangeSorting = (headType) => (event) => {
    event.preventDefault();
    change({ header: headType });
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
const HeaderBox = connect(
  mapStateToPropsForTable,
  actionCreatorsForHeader,
)(Header);
// ------------------------------------------------------------------------------------------
const actionCreatorsForRows = { setSelectedEmptyId };
const Rows = (props) => {
  const {
    currentData,
    tableHeaders,
    setSelectedEmptyId: addToEmptyInfo,
  } = props;
  if (currentData.length === 0) {
    return (<tr><td colSpan={tableHeaders.length}>None data match</td></tr>);
  }
  const handleClickRow = (id) => (event) => {
    event.preventDefault();
    addToEmptyInfo({ id });
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
const RowsBox = connect(
  mapStateToPropsForTable,
  actionCreatorsForRows,
)(Rows);
// ------------------------------------------------------------------------------------------
const geDataDownloadingStatus = (type) => (state) => state.data.statuses[type];
const mapStateToPropsStatus = (state) => ({
  status: geDataDownloadingStatus(state.navbar.selectedTab)(state),
});
const TheTable = ({ status }) => {
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
      <AddEntryForm />
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
const TableBox = connect(mapStateToPropsStatus)(TheTable);

const mapStateToPropsForDisplay = (state) => ({
  currentTab: state.navbar.selectedTab,
  error: errorsSelector(state.navbar.selectedTab)(state),
});
const DisplayBox = (props) => {
  const {
    currentTab,
    error,
  } = props;
  if (error) return <Alert />;
  return (
    <div>
      {currentTab === 'home' && <HomePage />}
      {currentTab !== 'home' && <TableBox />}
    </div>
  );
};

export default connect(mapStateToPropsForDisplay)(DisplayBox);
