import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface Timer {
  id: number;
  title: string;
  currDuration: number;
  newDuration: number;
  timeNow: number;
  started: boolean;
}

interface TimerArray extends Array<Timer> {}

export interface TimerState {
  selectedCard: number;
  cards: TimerArray;
}

const initialState: TimerState = loadState() || {
  selectedCard: 0,
  cards: [
    {
      id: 0,
      title: "Card 1",
      currDuration: 1500,
      newDuration: 1500,
      timeNow: 0,
      started: false,
    },
    {
      id: 1,
      title: "Card 2",
      currDuration: 3600,
      newDuration: 3600,
      timeNow: 0,
      started: false,
    },
  ],
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimer: (
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) => {
      const { id, time } = action.payload;
      state.cards[id].currDuration = time;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      state.cards[action.payload].started = false;
    },
    toggleTimer: (state, action: PayloadAction<number>) => {
      state.cards[action.payload].started =
        !state.cards[action.payload].started;
    },
  },
});

export const { updateTimer, stopTimer, toggleTimer } = timerSlice.actions;
export default timerSlice.reducer;
