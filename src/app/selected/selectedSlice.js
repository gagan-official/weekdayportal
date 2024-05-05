import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    handleSelectChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleSelectChange } = selectedSlice.actions;

export default selectedSlice.reducer;
