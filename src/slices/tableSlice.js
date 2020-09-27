import { createSlice } from '@reduxjs/toolkit';

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
export default tableSlice.reducer;
