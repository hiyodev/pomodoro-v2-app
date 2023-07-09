import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface Timer {
  id: number;
  title: string;
  currDuration: number;
  newDuration: number;
  timeNow: number;
  started: boolean;
  projects: ProjectArray;
}

interface Project {
  id: number;
  editMode: boolean;
  title: string;
  details: string;
}

interface ProjectArray extends Array<Project> {}

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
      title: "Change this in Settings",
      currDuration: 1500,
      newDuration: 1500,
      timeNow: 0,
      started: false,
      projects: [
        {
          id: 1,
          editMode: false,
          title: "Test Title goes here and many more title crap goes here",
          details:
            "This is just a test to see how the details will look like and to see if it wraps properly and many more details.",
          tasks: [],
        },
        {
          id: 2,
          editMode: false,
          title: "This is another test",
          details: "Let's see how this looks like when it's shorter.",
          tasks: [],
        },
      ],
    },
    {
      id: 1,
      title: "Card 2",
      currDuration: 3600,
      newDuration: 3600,
      timeNow: 0,
      started: false,
      projects: [],
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
    switchCard: (state, action: PayloadAction<number>) => {
      state.selectedCard = action.payload;
    },
  },
});

export const { updateTimer, stopTimer, toggleTimer, switchCard } =
  timerSlice.actions;
export default timerSlice.reducer;
