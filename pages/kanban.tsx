import type { NextPage } from "next";
import { MdArrowForward } from "react-icons/md";
import Head from "next/head";

const Kanban: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next UP: Kanban Board</title>
        <meta name="description" content="Kanban Board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>KANBAN GOES HERE</div>
      <p>
        In the meantime, check out the old version of my
        <a
          href="https://kanban-ob.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Kanban board! <MdArrowForward />
        </a>
      </p>
    </>
  );
};

export default Kanban;
