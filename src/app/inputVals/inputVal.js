import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const inputVal = createSlice({
  name: "inputVal",
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleInputChange } = inputVal.actions;

export default inputVal.reducer;
