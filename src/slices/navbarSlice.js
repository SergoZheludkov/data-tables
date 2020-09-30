import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    selectedTab: 'home',
  },
  reducers: {
    changeTable: (state, { payload }) => {
      state.selectedTab = payload.type;
    },
  },
});

export const { changeTable } = navbarSlice.actions;
export default navbarSlice.reducer;
