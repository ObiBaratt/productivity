import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

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

export const PomodoroProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(DEFAULT_TIMES.work);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, timer]);

  const start = () => {
    console.log("starting pomodoro");
    setIsRunning(true);
    setTimer(DEFAULT_TIMES.work);
  };

  const stop = () => {
    console.log("stopping pomodoro");
    setIsRunning(false);
    setTimer(0);
  };

  return (
    <PomodoroContext.Provider value={{ isRunning, start, stop, timer }}>
      {children}
    </PomodoroContext.Provider>
  );
};
