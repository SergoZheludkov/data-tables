import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPageNumber: 1,
  },
  reducers: {
    setCurrentPageNumber: (state, { payload }) => {
      state.currentPageNumber = payload.pageNumber;
    },
  },
  extraReducers: {
    'search/filterData': (state) => {
      state.currentPageNumber = 1;
    },
    'pageSize/setPageSize': (state) => {
      state.currentPageNumber = 1;
    },
  },
});

export const { nextPage, prevPage, setCurrentPageNumber } = paginationSlice.actions;
export default paginationSlice.reducer;
