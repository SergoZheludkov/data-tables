import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const getSortSettingArray = ({ order, type }) => {
  const types = order.map((columnName) => type[columnName]);
  return { order, types };
};

const tableGetMapper = {
  home: () => [],
  small: (state) => state.tableBox.data.small,
  large: (state) => state.tableBox.data.large,
};
const getSortSetting = (state) => state.tableBox.sort;
const getSortedTableDatas = (tableType) => createSelector(
  tableGetMapper[tableType],
  getSortSetting,
  (tabledata, sortSettings) => {
    const { order, types } = getSortSettingArray(sortSettings);
    return _.orderBy(tabledata, order, types);
  },
);

const getNumberOfLineDisplayed = (state) => state.tableBox.settings.numberOfLineDisplayed;
const getCurrentPageNumber = (state) => state.tableBox.settings.currentPageNumber;
const getCurrentPageDataSlice = (tableType) => createSelector(
  getSortedTableDatas(tableType),
  getNumberOfLineDisplayed,
  getCurrentPageNumber,
  (sortedData, numOfLineDisp, currentPageNum) => {
    const startDisp = currentPageNum * numOfLineDisp - numOfLineDisp;
    const finishDisp = currentPageNum * numOfLineDisp;
    return sortedData.slice(startDisp, finishDisp);
  },
);

const getMaxPageNumber = (tableType) => createSelector(
  tableGetMapper[tableType],
  getNumberOfLineDisplayed,
  (tableDatas, numOfLineDisp) => {
    console.log(tableDatas, numOfLineDisp);
    return Math.ceil(tableDatas.length / numOfLineDisp);
  },
);

const getDataErrors = (state) => state.tableBox.errors;
const getErrors = createSelector(
  getDataErrors,
  (errors) => (Object.entries(errors).length !== 0 ? Object.entries(errors) : null),
);
// ------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  currentTab: state.navbarBox.selectedTab,
  currentData: getCurrentPageDataSlice(state.navbarBox.selectedTab)(state),
  errors: getErrors(state),
  tableSettings: {
    ...state.tableBox.settings,
    maxPageNumber: getMaxPageNumber(state.navbarBox.selectedTab)(state),
  },
});

const renderTableControl = (currentPageNum, maxPageNum) => (
  <div className="d-flex justify-content-between align-items-center p-2">
    <Button variant="primary">Prev</Button>
    <div className="flex-grow-1 text-center">{currentPageNum} of {maxPageNum}</div>
    <Button variant="primary">Next</Button>
  </div>
);

const renderTable = (tableDatas, tableHeads, tableSettings) => {
  const { maxPageNumber, currentPageNumber } = tableSettings;
  const renderLine = () => tableDatas.map((person) => (
    <tr key={person.id}>
      {tableHeads.map((head) => (
        <td key={`p-${person[head]}`}>
          {person[head]}
        </td>
      ))}
    </tr>
  ));

  const tableControl = renderTableControl(currentPageNumber, maxPageNumber);
  return (
    <>
      {tableControl}
      <Table
        striped
        bordered
        hover
        size="sm"
        className="m-0"
      >
        <thead>
          <tr>
            {tableHeads.map((head) => <th key={head}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {renderLine()}
        </tbody>
      </Table>
      {tableControl}
    </>
  );
};

const tableHeadings = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
];

const TableBox = (props) => {
  const {
    currentTab,
    currentData,
    // errors,
    tableSettings,
  } = props;
  console.log(tableSettings);
  return (
    <div>
      {currentTab === 'home' && <p>Hello, man!</p>}
      {currentTab !== 'home' && renderTable(currentData, tableHeadings, tableSettings)}
    </div>
  );
};

export default connect(mapStateToProps)(TableBox);
