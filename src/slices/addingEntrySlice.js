import { createSlice } from '@reduxjs/toolkit';

const openClosedStatusMapper = {
  closed: 'opened',
  opened: 'closed',
};

const addingEntrySlice = createSlice({
  name: 'addEntryСontrol',
  initialState: {
    status: 'closed',
  },
  reducers: {
    changeAddingEntryBoxStatus: (state) => {
      state.status = openClosedStatusMapper[state.status];
    },
  },
});

export const { changeAddingEntryBoxStatus } = addingEntrySlice.actions;
export default addingEntrySlice.reducer;
