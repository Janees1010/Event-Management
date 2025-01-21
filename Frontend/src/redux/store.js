import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import formSlice from "./slices/FormSlice"


export const store = configureStore({
  reducer: {
    user: userSlice,
    form:formSlice
  },
});
