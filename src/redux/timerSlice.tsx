import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface TimerState {
  duration: number;
  timeNow: number;
  started: boolean;
}

const initialState: TimerState = loadState() || {
  duration: 1500,
  timeNow: 0,
  started: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimer: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    stopTimer: (state) => {
      state.started = false;
    },
    toggleTimer: (state) => {
      state.started = !state.started;
    },
  },
});

export const { updateTimer, stopTimer, toggleTimer } = timerSlice.actions;
export default timerSlice.reducer;
