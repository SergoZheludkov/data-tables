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
const addEntryStatusMapper = {
  closed: 'opened',
  opened: 'closed',
};

const addEntryСontrolBoxSlice = createSlice({
  name: 'addEntryСontrolBox',
  initialState: {
    status: 'closed',
  },
  reducers: {
    changeStatus: (state) => {
      state.status = addEntryStatusMapper[state.status];
    },
  },
});
export const { changeStatus } = addEntryСontrolBoxSlice.actions;
// ------------------------------------------------------------------------------------------
// const emptyInfoBoxSlice = createSlice({

// });
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
    settings: {
      currentPageNumber: 1,
      numberOfRowsDisplayed: 50,
      rowsDisplayOptions: [50, 100, 200],
    },
    sort: {
      order: [],
      type: {},
    },
    filtered: {
      search: '',
      head: '',
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
    sortReset: (state) => {
      state.sort = { order: [], type: {} };
    },
    filteredReset: (state) => {
      state.filtered = { search: '', head: '' };
    },
    removeSortedType: (state, { payload }) => {
      state.sort.order = _.without(state.sort.order, payload.type);
      state.sort.type = _.omit(state.sort.type, [payload.type]);
    },
    changeNumberOfRowsDisplayed: (state, { payload }) => {
      state.settings.numberOfRowsDisplayed = payload.numberOfRows;
      state.settings.currentPageNumber = 1;
    },
    changeSorting: (state, { payload }) => {
      const checkedOrder = state.sort.order.includes(payload.head);
      if (!checkedOrder) state.sort.order.push(payload.head);
      state.sort.type[payload.head] = state.sort.type[payload.head] === 'asc' ? 'desc' : 'asc';
    },
    filterData: (state, { payload }) => {
      state.filtered = payload.filterSettings;
      state.settings.currentPageNumber = 1;
    },
  },
  extraReducers: {
    'navbar/changeTable': (state, action) => {
      console.log(action.payload);
      state.data = action.payload.type;
    },
  },
});
export const {
  addEntryToData,
  nextPage,
  prevPage,
  setCurrentPage,
  sortReset,
  filteredReset,
  removeSortedType,
  filterData,
  changeNumberOfRowsDisplayed,
  changeSorting,
} = tableBoxSlice.actions;

export default combineReducers({
  navbarBox: navbarSlice.reducer,
  tableBox: tableBoxSlice.reducer,
  addEntryСontrolBox: addEntryСontrolBoxSlice.reducer,
});
