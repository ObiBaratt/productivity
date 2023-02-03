import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

export interface PomodoroContextTypes {
  timer: number;
  start: () => void;
  stop: () => void;
  isResting: boolean;
}

export const PomodoroContext = createContext<PomodoroContextTypes>({
  timer: 0,
  start: () => {},
  stop: () => {},
  isResting: false,
});

// Times in seconds, so default work is 25min, break 5
const DEFAULT_TIMES = {
  work: 5,
  rest: 3,
  numCycles: "not implemented",
  longRest: "not implemented",
};

export const PomodoroProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(-1);

  useEffect(() => {
    if (isRunning && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0 && !isResting) {
      setIsResting(true);
      rest();
    } else if (isResting) {
      setIsResting(false);
      setTimer(DEFAULT_TIMES.work);
    }
  }, [isRunning, timer, isResting]);

  const start = () => {
    console.log("starting pomodoro");
    setIsRunning(true);
    setTimer(DEFAULT_TIMES.work);
  };

  const stop = () => {
    console.log("stopping pomodoro");
    setIsRunning(false);
    setIsResting(false);
    setTimer(-1);
  };

  const rest = () => {
    console.log("time for a break!");
    setIsResting(true);
    setTimer(DEFAULT_TIMES.rest);
  };

  return (
    <PomodoroContext.Provider value={{ start, stop, timer, isResting }}>
      {children}
    </PomodoroContext.Provider>
  );
};
