import { createSlice } from '@reduxjs/toolkit';

const openCloseStatusMapper = {
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
      state.status = openCloseStatusMapper[state.status];
    },
  },
});

export const { changeAddingEntryBoxStatus } = addingEntrySlice.actions;
export default addingEntrySlice.reducer;
