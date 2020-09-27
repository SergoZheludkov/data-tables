import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    statuses: {},
    errors: {},
    downloads: {
      home: [],
    },
  },
  reducers: {
    updateData: (state, { payload }) => {
      const { type, data, status } = payload;
      state.statuses[type] = status;
      state.downloads[type] = data;
      state.errors[type] = null;
    },
    updateError: (state, { payload }) => {
      const { type, status } = payload;
      state.statuses[type] = status;
      state.errors[type] = payload.error;
    },
    addEntryToData: (state, { payload }) => {
      state.downloads[payload.dataType].unshift(payload.newEntry);
    },

  },
});

export const { addEntryToData, updateData } = dataSlice.actions;
export default dataSlice.reducer;
