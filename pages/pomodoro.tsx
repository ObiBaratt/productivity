import type { NextPage } from "next";
import { useContext } from "react";
import {
  PomodoroContext,
} from "../context/pomodoroContext";

const Pomodoro: NextPage = () => {
  const { start, stop, timer } = useContext(PomodoroContext);

  return (
    <>
      <div>POMODORO GOES HERE</div>
      <h1>{timer}</h1>
      <button onClick={start}>Start Timer</button>
      <button onClick={stop}>Stop Timer</button>
    </>
  );
};

export default Pomodoro;
