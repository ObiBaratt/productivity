import React, { createContext, useState, FC, ReactNode } from "react";

export interface PomodoroContextTypes {
  isRunning: boolean;
  timer: number;
  start: () => void;
  stop: () => void;
}

export const PomodoroContext = createContext<PomodoroContextTypes>({
  isRunning: false,
  timer: 0,
  start: () => {},
  stop: () => {},
});

// Times in seconds, so default work is 25min, break 5
const DEFAULT_TIMES = {
  work: 1500,
  rest: 300,
};

// TODO: Add actual timer function
export const PomodoroProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(DEFAULT_TIMES.work);
  let timerId: NodeJS.Timer | undefined;

  const startTimer = () => {
    timerId = setInterval(() => {
      console.log("tick");
      setTimer(timer - 1);
    }, 1000);
  };

  const start = () => {
    console.log("starting");
    setIsRunning(true);
    setTimer(DEFAULT_TIMES.work);
    startTimer();
  };

  const stop = (pause: boolean = false, rest: boolean = true) => {
    console.log("stopping");
    setIsRunning(false);
    if (!rest) {
      clearInterval(timerId);
    }
    if (!pause) {
      setTimer(0);
    }
  };

  return (
    <PomodoroContext.Provider value={{ isRunning, start, stop, timer }}>
      {children}
    </PomodoroContext.Provider>
  );
};
