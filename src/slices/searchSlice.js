import { createSlice } from '@reduxjs/toolkit';

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
export default searchSlice.reducer;
