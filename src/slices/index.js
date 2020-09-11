import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

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

// -------------------------------------------------------
const tableBoxSlice = createSlice({
  name: 'tableBox',
  initialState: {
    data: {},
    errors: {},
    sort: {
      order: ['firstName', 'email'],
      type: {
        firstName: 'asc',
        email: 'desc',
      },
    },
    settings: {
      currentPageNumber: 1,
      numberOfLineDisplayed: 50,
    },
  },
  reducers: {
    updateData: (state, { payload }) => {
      const { type, data } = payload;
      state.data[type] = data;
    },
    updateError: (state, { payload }) => {
      state.error = payload.error;
    },
  },
  extraReducers: {
    'navbar/changeTable': (state, action) => {
      state.data = action.payload.type;
    },
  },
});

export default combineReducers({
  navbarBox: navbarSlice.reducer,
  tableBox: tableBoxSlice.reducer,
});
