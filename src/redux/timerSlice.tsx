import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage/localStorage";

interface Timer {
  id: number;
  title: string;
  timer: {
    started: boolean;
    type: "pomodoro" | "shortbreak" | "longbreak";
    pomodoro: { duration: number; new: number };
    shortBreak: { duration: number; new: number };
    longBreak: { duration: number; new: number };
    timeNow: number;
  };
  projects: ProjectArray;
}

interface Project {
  id: string;
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

// Dummy Data, change once you add the "Add Card" functionality.
const initialState: TimerState = loadState() || {
  selectedCard: 0,
  cards: [
    {
      id: 0,
      title: "Change this in Settings",
      timer: {
        started: false,
        type: "pomodoro",
        pomodoro: { duration: 1500, new: 1500 },
        shortBreak: { duration: 300, new: 300 },
        longBreak: { duration: 600, new: 600 },
        timeNow: 0,
      },
      projects: [
        {
          id: 1,
          editMode: false,
          title: "Test33 Title goes here and many more title crap goes here",
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
      title: "Change this in Settings",
      timer: {
        started: false,
        type: "pomodoro",
        pomodoro: { duration: 3600, new: 3600 },
        shortBreak: { duration: 700, new: 700 },
        longBreak: { duration: 800, new: 800 },
        timeNow: 0,
      },
      projects: [
        {
          id: 1,
          editMode: false,
          title: "Test2 Title goes here and many more title crap goes here",
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
  ],
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // Timer Reducers
    setPomoTimer: (
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) => {
      const { id, time } = action.payload;
      state.cards[id].timer.pomodoro.duration = time;
    },
    setShortBreakTimer: (
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) => {
      const { id, time } = action.payload;
      state.cards[id].timer.shortBreak.duration = time;
    },
    setLongBreakTimer: (
      state,
      action: PayloadAction<{ id: number; time: number }>
    ) => {
      const { id, time } = action.payload;
      state.cards[id].timer.longBreak.duration = time;
    },
    resetTimer: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const { pomodoro, shortBreak, longBreak } = state.cards[id].timer;

      // Reset pomodoro, short-break, long-break timer for current card
      pomodoro.duration = pomodoro.new;
      shortBreak.duration = shortBreak.new;
      longBreak.duration = longBreak.new;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      // Stop current Timer
      state.cards[action.payload].timer.started = false;
    },
    toggleTimerState: (state, action: PayloadAction<number>) => {
      // Pause or Start Timer
      state.cards[action.payload].timer.started =
        !state.cards[action.payload].timer.started;
    },
    changeTimerMode: (
      state,
      action: PayloadAction<{
        id: number;
        mode: "pomodoro" | "shortbreak" | "longbreak";
      }>
    ) => {
      const { id, mode } = action.payload;
      state.cards[id].timer.type = mode;
    },
    switchTimerCard: (state, action: PayloadAction<number>) => {
      state.selectedCard = action.payload;
    },
    updateCardTitle: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      state.cards[id].title = newTitle;
    },
    // Project Reducers
    addProjectToList: (
      state,
      action: PayloadAction<{ id: number; project: Project }>
    ) => {
      const { id, project } = action.payload;
      state.cards[id].projects.push(project);
    },
    delProjectFromList: (
      state,
      action: PayloadAction<{ cardId: number; projectId: string }>
    ) => {
      const { cardId, projectId } = action.payload;
      state.cards[cardId].projects = state.cards[cardId].projects.filter(
        (project) => project.id !== projectId
      );
    },
    updateProjectList: (
      state,
      action: PayloadAction<{
        cardId: number;
        projectId: string;
        project: { title: string; details: string };
      }>
    ) => {
      const { cardId, projectId, project } = action.payload;
      const { title, details } = project;
      state.cards[cardId].projects = state.cards[cardId].projects.map(
        (project) =>
          project.id === projectId
            ? { ...project, title, details, editMode: false }
            : project
      );
    },
    setProjectEditMode: (
      state,
      action: PayloadAction<{
        cardId: number;
        projectId: string;
        editState: boolean;
      }>
    ) => {
      const { cardId, projectId, editState } = action.payload;
      state.cards[cardId].projects = state.cards[cardId].projects.map(
        (project) => {
          if (projectId === project.id) {
            project.editMode = editState;
            return project;
          }

          project.editMode = false;
          return project;
        }
      );
    },
  },
});

export const {
  stopTimer,
  resetTimer,
  setPomoTimer,
  setShortBreakTimer,
  setLongBreakTimer,
  toggleTimerState,
  changeTimerMode,
  switchTimerCard,
  updateCardTitle,
  addProjectToList,
  delProjectFromList,
  updateProjectList,
  setProjectEditMode,
} = timerSlice.actions;
export default timerSlice.reducer;
