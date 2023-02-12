import React from 'react';
import { Task } from '@prisma/client';
import "./Card.module.css";

const Card: React.FC<Task> = (card) => {
    return (
        <div className={"card"}>
        <h3 className="title">{card.title}</h3>
        <p className="text">{card.text}</p>
        </div>
    );
};

export default Card;
