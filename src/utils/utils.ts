export const secondsIntoTimer = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
};

export const convertDurationIntoMinutes = (totalSeconds: number): number => {
  const minutes = Math.floor(totalSeconds / 60);

  return minutes;
};
