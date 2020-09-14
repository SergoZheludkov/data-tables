import { createSelector } from 'reselect';
import _ from 'lodash';

// ------------------------------------------------------------------------------------------
const getTableData = (type) => (state) => state.data.downloads[type] || [];
const getFilterSetting = (state) => state.search;
const getSortSetting = (state) => state.sorting;
const getNumberOfRowsDisplayed = (state) => state.table.settings.numberOfRowsDisplayed;
const getCurrentPageNumber = (state) => state.table.settings.currentPageNumber;
const getSelectedEmptyId = (state) => state.emptyInfo.selectedEmptyId;
const getDataErrors = (state) => state.data.errors;

export const getSortSettingSelector = createSelector(
  getSortSetting,
  ({ order, types }) => {
    const typesArray = order.map((columnName) => types[columnName]);
    return { order, types: typesArray };
  },
);

const filtredTableDatasSelector = (tableType) => createSelector(
  getTableData(tableType),
  getFilterSetting,
  (tabledata, { searchText, selectedHeader }) => {
    const targetText = _.toLower(searchText.trim());
    const filtredData = tabledata
      .filter((item) => _.toLower(item[selectedHeader]).includes(targetText));
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

export const selectedEmptyDataSelector = (tableType) => createSelector(
  currentPageDataSliceSelector(tableType),
  getSelectedEmptyId,
  (currentPageData, selectedEmptyId) => _.find(currentPageData, { id: selectedEmptyId }),
);

export const errorsSelector = (type) => createSelector(
  getDataErrors,
  (errors) => (errors[type] ? errors[type] : null),
);

export const maxPageNumberSelector = (tableType) => createSelector(
  filtredTableDatasSelector(tableType),
  getNumberOfRowsDisplayed,
  (tableDatas, numOfRowsDisp) => Math.ceil(tableDatas.length / numOfRowsDisp) || 1,
);
