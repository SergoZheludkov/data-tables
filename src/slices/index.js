import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import smalldata from '../data/small.json';
import largedata from '../data/large.json';

// “Мутабельный” стиль обработки событий доступен благодаря использованию библиотеки Immer
// которая встроена в Redux toolkit.
// Функция обработчик может либо “мутировать” переданный state для изменения свойств,
// либо возвращать новый state, как при работе в иммутабельном стиле,
// но, благодаря Immer, реальная мутация объекта не осуществляется.
// ------------------------------------------------------------------------------------------
const localDataMapper = {
  small: smalldata,
  large: largedata,
};
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    statuses: {},
    errors: {},
    downloads: {
      home: [],
    },
  },
  reducers: {
    updateData: (state, { payload }) => {
      const { type, data, status } = payload;
      state.statuses[type] = status;
      state.downloads[type] = data;
    },
    downloadLocalData: (state, { payload }) => {
      console.log(payload);
      state.statuses[payload.type] = 'success';
      state.downloads[payload.type] = localDataMapper[payload.type];
      state.errors[payload.type] = null;
    },
    updateError: (state, { payload }) => {
      const { type, status } = payload;
      console.log(status);
      state.statuses[type] = status;
      state.errors[type] = payload.error;
    },
    addEntryToData: (state, { payload }) => {
      state.downloads[payload.dataType].unshift(payload.newEntry);
    },

  },
});
export const { addEntryToData, downloadLocalData } = dataSlice.actions;
// ------------------------------------------------------------------------------------------
const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    elements: {
      home: 'home',
      small: 'small dataset',
      large: 'large dataset',
    },
    selectedTab: 'home',
  },
  reducers: {
    changeTable: (state, action) => {
      state.selectedTab = action.payload.type;
    },
  },
});
export const { changeTable } = navbarSlice.actions;
// ------------------------------------------------------------------------------------------
const openClosedStatusMapper = {
  closed: 'opened',
  opened: 'closed',
};

const addEntryСontrolSlice = createSlice({
  name: 'addEntryСontrol',
  initialState: {
    status: 'closed',
  },
  reducers: {
    changeAddEntryСontrolBoxStatus: (state) => {
      state.status = openClosedStatusMapper[state.status];
    },
  },
});
export const { changeAddEntryСontrolBoxStatus } = addEntryСontrolSlice.actions;
// ------------------------------------------------------------------------------------------
const emptyInfoSlice = createSlice({
  name: 'emptyInfo',
  initialState: {
    status: 'closed',
    selectedEmptyId: null,
  },
  reducers: {
    changeEmptyInfoBoxStatus: (state) => {
      state.status = openClosedStatusMapper[state.status];
    },
    setSelectedEmptyId: (state, { payload }) => {
      state.status = 'opened';
      state.selectedEmptyId = payload.id;
    },
  },
  extraReducers: {
    'navbar/changeTable': (state) => {
      state.status = 'closed';
      state.selectedEmptyId = null;
    },
    'search/filterData': (state) => {
      state.status = 'closed';
      state.selectedEmptyId = null;
    },
  },
});
export const { changeEmptyInfoBoxStatus, setSelectedEmptyId } = emptyInfoSlice.actions;
// ------------------------------------------------------------------------------------------
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
    selectedHeader: '',
  },
  reducers: {
    filterData: (state, { payload }) => {
      state.searchText = payload.searchText;
      state.selectedHeader = payload.selectedHeader;
    },
    filteredReset: (state) => {
      state.searchText = '';
      state.selectedHeader = '';
    },
  },
});
export const { filterData, filteredReset } = searchSlice.actions;
// ------------------------------------------------------------------------------------------
const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    order: [],
    types: {},
  },
  reducers: {
    sortReset: (state) => {
      state.order = [];
      state.types = {};
    },
    removeSortedType: (state, { payload }) => {
      state.order = _.without(state.order, payload.header);
      state.types = _.omit(state.types, [payload.header]);
    },
    changeSorting: (state, { payload: { header } }) => {
      const checkedOrder = state.order.includes(header);
      if (!checkedOrder) state.order.push(header);
      state.types[header] = state.types[header] === 'asc' ? 'desc' : 'asc';
    },
  },
});
export const { sortReset, removeSortedType, changeSorting } = sortingSlice.actions;
// ------------------------------------------------------------------------------------------
const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tableHeaders: [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
    ],
    settings: {
      currentPageNumber: 1,
      numberOfRowsDisplayed: 50,
      rowsDisplayOptions: [50, 100, 200],
    },
  },
  reducers: {
    nextPage: (state) => {
      state.settings.currentPageNumber += 1;
    },
    prevPage: (state) => {
      state.settings.currentPageNumber -= 1;
    },
    changeNumberOfRowsDisplayed: (state, { payload }) => {
      state.settings.numberOfRowsDisplayed = payload.numberOfRows;
      state.settings.currentPageNumber = 1;
    },
  },
  extraReducers: {
    'search/filterData': (state) => {
      state.settings.currentPageNumber = 1;
    },
  },
});
export const { nextPage, prevPage, changeNumberOfRowsDisplayed } = tableSlice.actions;
// ------------------------------------------------------------------------------------------
export default combineReducers({
  data: dataSlice.reducer,
  navbar: navbarSlice.reducer,
  table: tableSlice.reducer,
  addEntryСontrol: addEntryСontrolSlice.reducer,
  emptyInfo: emptyInfoSlice.reducer,
  search: searchSlice.reducer,
  sorting: sortingSlice.reducer,
});
