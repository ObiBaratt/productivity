import type { NextPage } from "next";
import { useEffect, useContext, useState } from "react";
import TodoTask from "../apps/Todo/components/TodoTask";
import CreateTodo from "../apps/Todo/components/TodoList";
import Head from "next/head";

import { TaskContext, TaskContextTypes } from "../context/taskContext";

const Todo: NextPage = () => {
  const { tasks, updateTasks } = useContext(TaskContext) as TaskContextTypes;
  const [loading, setLoading] = useState<boolean>(true);

  // only ever want this to run once, other fetching will be handled manually
  useEffect(() => {
    const fetch = async () => {
      await updateTasks();
      setLoading(false);
    };
    fetch();
    console.log("fetching");
  }, []);

  return (
    <>
      <Head>
        <title>Next UP: Todo List</title>
        <meta name="description" content="Todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <CreateTodo /> */}
      <h1>To-do</h1>

      {loading ? (
        <h2>Loading tasks...</h2>
      ) : tasks?.filter((task) => !task.isDone).length > 0 ? (
        tasks
          .filter((task) => !task.isDone)
          .map((task) => <TodoTask key={task.id} {...task} />)
      ) : (
        <h2>No tasks to display, all caught up!</h2>
      )}

      <h1>Completed</h1>
      {loading ? (
        <h2>Loading tasks...</h2>
      ) : tasks?.filter((task) => task.isDone).length > 0 ? (
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
