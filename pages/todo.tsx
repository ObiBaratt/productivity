import type { NextPage } from "next";
import { useEffect, useContext, useState } from "react";
import TodoTask from "../apps/Todo/components/TodoTask";
import Head from "next/head";

import { TaskContext, TaskContextTypes } from "../context/taskContext";
import axios from "axios";
import { Task } from "@prisma/client";

const Todo: NextPage = () => {
  const { tasks, updateTasks } = useContext(TaskContext) as TaskContextTypes;
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<String>("");
  const [title, setTitle] = useState<String>("");
  const [category, setCategory] = useState<String>("");

  // only ever want this to run once, other fetching will be handled manually
  useEffect(() => {
    const fetch = async () => {
      await updateTasks();
      setLoading(false);
    };
    fetch();
    console.log("fetching");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title: title,
      text: text,
      category: category,
    };
    console.log(newTask);
    const { data } = await axios.post<Task>("/api/tasks", newTask);
  };

  return (
    <>
      <Head>
        <title>Next UP: Todo List</title>
        <meta name="description" content="Todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>To-do</h1>

      <div id="form">
        <form onSubmit={handleSubmit} id="createTodoForm">
          <input
            placeholder="Task text..."
            onChange={(e) => setText(e.target.value)}
          />
          <input
            placeholder="Task title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="backlog">Backlog</option>
            <option value="priority">Priority</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <input type="submit" value="Create New Todo" />
        </form>
      </div>

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
