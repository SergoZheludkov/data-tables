import { createSelector } from 'reselect';
import _ from 'lodash';

// ------------------------------------------------------------------------------------------
// utilits
const getSortSettingArrays = ({ order, type }) => {
  const types = order.map((columnName) => type[columnName]);
  return { order, types };
};

const getTableData = (type) => (state) => state.tableBox.data[type];
const getSortSetting = (state) => state.tableBox.sort;
const getNumberOfLineDisplayed = (state) => state.tableBox.settings.numberOfLineDisplayed;
const getCurrentPageNumber = (state) => state.tableBox.settings.currentPageNumber;
const getDataErrors = (state) => state.tableBox.errors;

export const descriptionToSortedInfoSelector = createSelector(
  getSortSetting,
  (sortSettings) => {
    const { order, types } = getSortSettingArrays(sortSettings);
    const orderToString = order.reduce((acc, head, i) => `${acc} ${acc === '' ? '' : '->'} ${head}-${types[i]}`, '');
    return `Sorted by: ${orderToString}`;
  },
);
export const maxPageNumberSelector = (tableType) => createSelector(
  getTableData(tableType),
  getNumberOfLineDisplayed,
  (tableDatas, numOfLineDisp) => Math.ceil(tableDatas.length / numOfLineDisp),
);
const SortedTableDatasSelector = (tableType) => createSelector(
  getTableData(tableType),
  getSortSetting,
  (tabledata, sortSettings) => {
    const { order, types } = getSortSettingArrays(sortSettings);
    return _.orderBy(tabledata, order, types);
  },
);
export const currentPageDataSliceSelector = (tableType) => createSelector(
  SortedTableDatasSelector(tableType),
  getNumberOfLineDisplayed,
  getCurrentPageNumber,
  (sortedData, numOfLineDisp, currentPageNum) => {
    const startDisp = currentPageNum * numOfLineDisp - numOfLineDisp;
    const finishDisp = currentPageNum * numOfLineDisp;
    return sortedData.slice(startDisp, finishDisp);
  },
);
export const errorsSelector = createSelector(
  getDataErrors,
  (errors) => (Object.entries(errors).length !== 0 ? Object.entries(errors) : null),
);
