import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface Timer {
  id: number;
  title: string;
  timer: {
    started: boolean;
    focusDuration: number;
    newFocusDuration: number;
    breakDuration: number;
    newBreakDuration: number;
    timeNow: number;
  };
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
      timer: {
        started: false,
        focusDuration: 1500,
        newFocusDuration: 1500,
        breakDuration: 300,
        newBreakDuration: 300,
        timeNow: 0,
      },
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
      timer: {
        started: false,
        focusDuration: 3600,
        newFocusDuration: 3600,
        breakDuration: 600,
        newBreakDuration: 600,
        timeNow: 0,
      },
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
      state.cards[id].timer.focusDuration = time;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      state.cards[action.payload].timer.started = false;
    },
    toggleTimer: (state, action: PayloadAction<number>) => {
      state.cards[action.payload].timer.started =
        !state.cards[action.payload].timer.started;
    },
    switchCard: (state, action: PayloadAction<number>) => {
      state.selectedCard = action.payload;
    },
    updateCardTitle: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      state.cards[id].title = newTitle;
    },
  },
});

export const {
  updateTimer,
  stopTimer,
  toggleTimer,
  switchCard,
  updateCardTitle,
} = timerSlice.actions;
export default timerSlice.reducer;
