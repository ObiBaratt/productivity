import React, { createContext, useState } from "react";
import axios from "axios";

import { Task } from "@prisma/client";

export interface TaskContextTypes {
  tasks: Task[] | [];
  updateTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextTypes>({
  tasks: [],
  updateTasks: () => Promise.resolve(),
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTasks = async () => {
    console.log('fetched tasks')
    const { data } = await axios.get<Task[]>("/api/tasks");
    setTasks(data);
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
