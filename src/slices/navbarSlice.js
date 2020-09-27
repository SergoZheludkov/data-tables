import { createSlice } from '@reduxjs/toolkit';

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
export default navbarSlice.reducer;
