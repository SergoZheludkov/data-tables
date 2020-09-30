import { combineReducers } from 'redux';

import dataReducer from './dataSlice';
import navbarReducer from './navbarSlice';
import addEntryСontrolReducer from './addingEntrySlice';
import emptyInfoReducer from './emptyInfoSlice';
import searchReducer from './searchSlice';
import sortingReducer from './sortingSlice';
import tableReducer from './tableSlice';
import paginationReducer from './paginationSlice';
import pageSizeReducer from './pageSizeSlice';
import languageReducer from './languageSlice';

export default combineReducers({
  data: dataReducer,
  navbar: navbarReducer,
  addEntryСontrol: addEntryСontrolReducer,
  emptyInfo: emptyInfoReducer,
  search: searchReducer,
  sorting: sortingReducer,
  table: tableReducer,
  pagination: paginationReducer,
  pageSize: pageSizeReducer,
  language: languageReducer,
});
