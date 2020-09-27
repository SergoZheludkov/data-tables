import { createSlice } from '@reduxjs/toolkit';

// const openClosedStatusMapper = {
//   closed: 'opened',
//   opened: 'closed',
// };

const emptyInfoSlice = createSlice({
  name: 'emptyInfo',
  initialState: {
    status: 'closed',
    selectedEmptyId: null,
  },
  reducers: {
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

export const { setSelectedEmptyId } = emptyInfoSlice.actions;
export default emptyInfoSlice.reducer;
