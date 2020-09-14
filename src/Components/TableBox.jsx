import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { errorsSelector, currentPageDataSliceSelector } from '../selectors';
import { PageControlBox, ButtonsControlTheNumberOfRowsBox } from './TableControl';
import { AddEntryControlBox, AddEntryFormBox } from './AddEntryControlBox';
import SortedControlBox from './SortedControl';
import EmptyInfoBox from './EmptyInfoBox';
import Search from './Search';
import { changeSorting, setSelectedEmptyId, downloadLocalData } from '../slices';
import { defaultIcon, upIcon, downIcon } from './icons';
import loading from '../assets/img/loading.gif';

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
      <AddEntryFormBox />
      <PageControlBox />
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
      <PageControlBox />
      <EmptyInfoBox />
    </>
  );
};
const TableBox = connect(mapStateToPropsStatus)(TheTable);

const mapStateToPropsForDisplay = (state) => ({
  currentTab: state.navbar.selectedTab,
  error: errorsSelector(state.navbar.selectedTab)(state),
});
const actionCreatorsForDisplay = { downloadLocalData };
const DisplayBox = (props) => {
  const {
    currentTab,
    error,
    downloadLocalData: downloadLocal,
  } = props;
  const handleClickDownloadLocalData = (type) => (event) => {
    event.preventDefault();
    downloadLocal({ type });
  };
  if (error) {
    return (
    <div className="d-flex justify-content-center mt-5">
      <Alert className="w-50" variant="danger">
        <Alert.Heading>Oh snap! You got {error.message}!</Alert.Heading>
        <p>
          An error occured, to use the demo version you can load data from local storage
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleClickDownloadLocalData(currentTab)} variant="primary">
            Download local data
          </Button>
        </div>
      </Alert>
    </div>
    );
  }
  return (
    <div>
      {currentTab === 'home' && <p>Hello, man!</p>}
      {currentTab !== 'home' && <TableBox />}
    </div>
  );
};

export default connect(
  mapStateToPropsForDisplay,
  actionCreatorsForDisplay,
)(DisplayBox);
