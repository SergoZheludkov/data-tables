import { createSelector } from 'reselect';
import _ from 'lodash';

// ------------------------------------------------------------------------------------------
const getTableData = (type) => (state) => state.tableBox.data[type] || [];
const getFilterSetting = (state) => state.tableBox.filtered;
const getSortSetting = (state) => state.tableBox.sort;
const getNumberOfRowsDisplayed = (state) => state.tableBox.settings.numberOfRowsDisplayed;
const getCurrentPageNumber = (state) => state.tableBox.settings.currentPageNumber;
const getDataErrors = (state) => state.tableBox.errors;

export const getSortSettingSelector = createSelector(
  getSortSetting,
  ({ order, type }) => {
    const types = order.map((columnName) => type[columnName]);
    return { order, types };
  },
);

const filtredTableDatasSelector = (tableType) => createSelector(
  getTableData(tableType),
  getFilterSetting,
  (tabledata, { search, head }) => {
    const targetText = _.toLower(search.trim());
    const filtredData = tabledata.filter((item) => _.toLower(item[head]).includes(targetText));
    return filtredData;
  },
);
const sortedTableDatasSelector = (tableType) => createSelector(
  filtredTableDatasSelector(tableType),
  getSortSettingSelector,
  (tabledata, { order, types }) => _.orderBy(tabledata, order, types),
);
export const currentPageDataSliceSelector = (tableType) => createSelector(
  sortedTableDatasSelector(tableType),
  getNumberOfRowsDisplayed,
  getCurrentPageNumber,
  (sortedData, numOfRowsDisp, currentPageNum) => {
    const startDisp = currentPageNum * numOfRowsDisp - numOfRowsDisp;
    const finishDisp = currentPageNum * numOfRowsDisp;
    return sortedData.slice(startDisp, finishDisp);
  },
);
export const errorsSelector = createSelector(
  getDataErrors,
  (errors) => (Object.entries(errors).length !== 0 ? Object.entries(errors) : null),
);
export const maxPageNumberSelector = (tableType) => createSelector(
  filtredTableDatasSelector(tableType),
  getNumberOfRowsDisplayed,
  (tableDatas, numOfRowsDisp) => Math.ceil(tableDatas.length / numOfRowsDisp) || 1,
);
