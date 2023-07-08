import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TimerState {
  duration: number;
  started: boolean;
}

const initialState: TimerState = {
  duration: 1500,
  started: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimer: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const { updateTimer } = timerSlice.actions;
export default timerSlice.reducer;
