import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    order: [],
    types: {},
  },
  reducers: {
    sortReset: (state) => {
      state.order = [];
      state.types = {};
    },
    removeSortedType: (state, { payload }) => {
      state.order = _.without(state.order, payload.header);
      state.types = _.omit(state.types, [payload.header]);
    },
    changeSorting: (state, { payload: { header } }) => {
      const checkedOrder = state.order.includes(header);
      if (!checkedOrder) state.order.push(header);
      state.types[header] = state.types[header] === 'asc' ? 'desc' : 'asc';
    },
  },
});

export const { sortReset, removeSortedType, changeSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
