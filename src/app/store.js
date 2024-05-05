import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "./selected/selectedSlice";
import inputValReducer from "./inputVals/inputVal";

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    inputVal: inputValReducer,
  },
});
