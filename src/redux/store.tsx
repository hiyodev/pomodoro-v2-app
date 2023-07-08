import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";
import { saveState } from "../localStorage/localStorage";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState().timer);
  saveState(store.getState().timer);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
