import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/features/counter/counterSlice";
import themeReducer from "./features/theme/themeSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeSlice: themeReducer,
    sidebarReducer: sidebarReducer,
  },
});
