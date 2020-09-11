import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { errorsSelector, currentPageDataSliceSelector } from '../selectors';
import { SortedInfoBox, TableControlBox } from './TableControl';
// ------------------------------------------------------------------------------------------
const mapStateToPropsForTable = (state) => ({
  currentData: currentPageDataSliceSelector(state.navbarBox.selectedTab)(state),
  headings: state.tableBox.headings,
  errors: errorsSelector(state),
});
const TheTable = (props) => {
  const { currentData, headings } = props;
  const renderLine = () => currentData.map((person) => (
    <tr key={person.id}>
      {headings.map((head) => (
        <td key={`p-${person[head]}`}>
          {person[head]}
        </td>
      ))}
    </tr>
  ));
  return (
    <>
      <SortedInfoBox />
      <TableControlBox />
      <Table
        striped
        bordered
        hover
        size="sm"
        className="m-0"
      >
        <thead>
          <tr>
            {headings.map((head) => <th key={head}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {renderLine()}
        </tbody>
      </Table>
      <TableControlBox />
    </>
  );
};
const TableBox = connect(mapStateToPropsForTable)(TheTable);

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
