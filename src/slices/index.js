import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

// “Мутабельный” стиль обработки событий доступен благодаря использованию библиотеки Immer
// которая встроена в Redux toolkit.
// Функция обработчик может либо “мутировать” переданный state для изменения свойств,
// либо возвращать новый state, как при работе в иммутабельном стиле,
// но, благодаря Immer, реальная мутация объекта не осуществляется.

const navbarSlice = createSlice({
  name: 'navbarBox',
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

const addEntryСontrolBoxSlice = createSlice({
  name: 'addEntryСontrolBox',
  initialState: {
    status: 'closed',
  },
  reducers: {
    changeAddEntryСontrolBoxStatus: (state) => {
      state.status = openClosedStatusMapper[state.status];
    },
  },
});
export const { changeAddEntryСontrolBoxStatus } = addEntryСontrolBoxSlice.actions;
// ------------------------------------------------------------------------------------------
const emptyInfoBoxSlice = createSlice({
  name: 'emptyInfoBox',
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
});
export const { changeEmptyInfoBoxStatus, setSelectedEmptyId } = emptyInfoBoxSlice.actions;
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
const tableBoxSlice = createSlice({
  name: 'tableBox',
  initialState: {
    statuses: {},
    errors: {},
    data: {
      home: [],
    },
    headings: [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
    ],
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
    updateData: (state, { payload }) => {
      const { type, data, status } = payload;
      state.statuses[type] = status;
      state.data[type] = data;
    },
    addEntryToData: (state, { payload }) => {
      state.data[payload.dataType].unshift(payload.newEntry);
    },
    updateError: (state, { payload }) => {
      state.error = payload.error;
    },
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
export const {
  addEntryToData,
  nextPage,
  prevPage,
  setCurrentPage,
  changeNumberOfRowsDisplayed,
} = tableBoxSlice.actions;

export default combineReducers({
  navbarBox: navbarSlice.reducer,
  tableBox: tableBoxSlice.reducer,
  addEntryСontrolBox: addEntryСontrolBoxSlice.reducer,
  emptyInfoBox: emptyInfoBoxSlice.reducer,
  search: searchSlice.reducer,
  sorting: sortingSlice.reducer,
});
