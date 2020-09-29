import { createSlice } from '@reduxjs/toolkit';

const pageSizeSlice = createSlice({
  name: 'pageSize',
  initialState: {
    allSizes: [50, 100, 200],
    currentSize: 50,
  },
  reducers: {
    setPageSize: (state, { payload }) => {
      state.currentSize = payload.size;
    },
  },
});

export const { setPageSize } = pageSizeSlice.actions;
export default pageSizeSlice.reducer;
