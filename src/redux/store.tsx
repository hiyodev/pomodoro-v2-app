import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";
import { saveState } from "../localStorage/localStorage";
import { throttle } from "lodash";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});

store.subscribe(
  throttle(() => {
    console.log(store.getState().timer);
    saveState(store.getState().timer);
  }, 500)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
