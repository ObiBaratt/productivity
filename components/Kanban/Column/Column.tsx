import { Task } from "@prisma/client";
import React from "react";
import Card from "../Card/Card";

interface Props {
  type: string;
  cards: Task[] | undefined;
}

const Column: React.FC<Props> = ({ type, cards }) => {
  console.log(type, cards);
  return (
    <div
      id={`${type}-column`}
      style={{ flexDirection: "column", height: "100%", width: "20%" }}
    >
      {cards?.map((card: Task) => {
        return <Card key={card.id} {...card} />;
      })}
    </div>
  );
};

export default Column;
