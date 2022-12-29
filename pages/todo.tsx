import { Task } from "@prisma/client";
import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoTask from "../apps/Todo/components/TodoTask";

const Todo: NextPage = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [completed, setCompleted] = useState<Task[] | []>([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await axios.get<Task[]>(`/api/tasks`);
      setTasks(data);
    };
    getTasks();
  });

  return (
    <>
      <h1>To-do</h1>
      {tasks?.length && tasks.length > 0 ? (
        tasks
          .filter((task) => !task.isDone)
          .map((task) => <TodoTask key={task.id} {...task} />)
      ) : (
        <h2>No tasks to display, all caught up!</h2>
      )}

      <h1>Completed</h1>
      {tasks?.length && tasks.length > 0 ? (
        tasks
          .filter((task) => task.isDone)
          .map((task) => <TodoTask key={task.id} {...task} />)
      ) : (
        <h2>Nothing here... get to work!</h2>
      )}
    </>
  );
};

export default Todo;
