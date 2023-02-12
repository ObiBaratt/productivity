import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import Column from "../components/Kanban/Column/Column";
import { TaskContext, TaskContextTypes } from "../context/taskContext";
import sortCards from "../lib/utils/sortCards";

const Kanban: NextPage = () => {
    const { tasks, updateTasks } = useContext(TaskContext) as TaskContextTypes;
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetch = async () => {
      await updateTasks();
      setLoading(false);
    };
    fetch();
    console.log("fetching");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const priority = sortCards('priority', tasks);
    const backlog = sortCards('backlog', tasks);
    const in_progress = sortCards('in_progress', tasks);
    const complete = sortCards('complete', tasks);

  return (
    <>
      <Head>
        <title>Next UP: Kanban Board</title>
        <meta name="description" content="Kanban Board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>KANBAN</h1>

      <div
        style={{
          width: "80vw",
          height: "90vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Column type="backlog" cards={backlog} />
        <Column type="priority" cards={priority} />
        <Column type="in_progress" cards={in_progress} />
        <Column type="complete" cards={complete} />
      </div>
    </>
  );
};

export default Kanban;
