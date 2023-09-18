import { TimerState } from "../redux/timerSlice";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("pomo-v2-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveState = (state: TimerState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("pomo-v2-state", serializedState);
  } catch (error) {
    console.log(error);
  }
};
