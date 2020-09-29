import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tableHeaders: [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
    ],
  },
});

export default tableSlice.reducer;
