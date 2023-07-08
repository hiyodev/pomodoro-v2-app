import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface Timer {
  duration: number;
  timeNow: number;
  started: boolean;
}

interface TimerState extends Array<Timer> {}

const initialState: TimerState = loadState() || [
  {
    duration: 1500,
    timeNow: 0,
    started: false,
  },
];

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimer: (
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) => {
      const { id, time } = action.payload;

      state[id].duration = time;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      state[action.payload].started = false;
    },
    toggleTimer: (state, action: PayloadAction<number>) => {
      state[action.payload].started = !state[action.payload].started;
    },
  },
});

export const { updateTimer, stopTimer, toggleTimer } = timerSlice.actions;
export default timerSlice.reducer;
