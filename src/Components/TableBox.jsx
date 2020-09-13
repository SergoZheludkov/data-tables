import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import { errorsSelector, currentPageDataSliceSelector } from '../selectors';
import { PageControlBox, ButtonsControlTheNumberOfRowsBox } from './TableControl';
import { defaultIcon, upIcon, downIcon } from './icons';
import { changeSorting } from '../slices';
import loading from '../assets/img/loading.gif';
import Search from './Search';
import SortedControlBox from './SortedControl';
import { AddEntryControlBox, AddEntryFormBox } from './AddEntryControlBox';

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
  currentData: currentPageDataSliceSelector(state.navbarBox.selectedTab)(state),
  headings: state.tableBox.headings,
  errors: errorsSelector(state),
  sortedInfo: state.tableBox.sort.type,
});
const actionCreatorsForHeader = { changeSorting };
const Header = (props) => {
  const {
    headings,
    sortedInfo,
    changeSorting: change,
  } = props;
  const handlerChangeSorting = (headType) => (event) => {
    event.preventDefault();
    change({ head: headType });
  };
  return (headings
    .map((head) => (
      <th onClick={handlerChangeSorting(head)} key={head}>
        <div className="float-left">
          {head}
        </div>
        <div className="float-right">
          {getCurrentIcon(sortedInfo[head])}
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
const Rows = (props) => {
  const { currentData, headings } = props;
  if (currentData.length === 0) {
    return (<tr><td colSpan={headings.length}>None data match</td></tr>);
  }
  return (
    currentData
      .map((person) => (
        <tr key={_.uniqueId()}>
          {headings.map((head) => (
            <td key={`p-${person[head]}`}>
              {person[head]}
            </td>
          ))}
      </tr>
      ))
  );
};
const RowsBox = connect(mapStateToPropsForTable)(Rows);
// ------------------------------------------------------------------------------------------
const geDataDownloadingStatus = (type) => (state) => state.tableBox.statuses[type];
const mapStateToPropsStatus = (state) => ({
  status: geDataDownloadingStatus(state.navbarBox.selectedTab)(state),
});
const TheTable = ({ status }) => {
  if (status !== 'success') {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <img className="w-25" src={loading}/>
      </div>
    );
  }
  return (<>
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
    </>
  );
};
const TableBox = connect(mapStateToPropsStatus)(TheTable);

const mapStateToPropsForDisplay = (state) => ({
  currentTab: state.navbarBox.selectedTab,
});

const DisplayBox = (props) => {
  const { currentTab } = props;
  return (
    <div>
      {currentTab === 'home' && <p>Hello, man!</p>}
      {currentTab !== 'home' && <TableBox />}
    </div>
  );
};

export default connect(mapStateToPropsForDisplay)(DisplayBox);
