import { Prisma, Task } from "@prisma/client";
import axios from "axios";
import { MdCheck } from "react-icons/md";
import styled from "styled-components";
import { TaskContext, TaskContextTypes } from "../../../context/taskContext";
import { useContext } from "react";

const Todo = styled.div`
  display: grid;
  font-size: x-large;
  grid-template-columns: min-content auto;
  gap: 0.75rem;
  align-items: center;
`;

const Text = styled.h2`
  margin: 0;
  font-size: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DoneButton = styled.button<{ isDone: boolean }>`
  background: ${(props) =>
    props.isDone ? "var(--color-success)" : "transparent"};
  border-color: ${(props) =>
    props.isDone ? "var(--color-success)" : "var(--color-black-300)"};
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  font-size: inherit;
  display: flex;
  align-items: center;

  svg {
    opacity: ${(props) => (props.isDone ? "1" : "0")};
  }

  &:not(:disabled):hover {
    background: var(--color-success);
    cursor: pointer;

    svg {
      opacity: 1;
    }
  }

  &:disabled svg {
    color: var(--color-black-400);
  }
`;
const TrashButton = styled.button`
  background-color: transparent;
  border: none !important;
`;

const TodoTask: React.FC<Task> = ({ id, isDone, title, text, isTrash }) => {
  const { updateTasks } = useContext(TaskContext) as TaskContextTypes;

  const updateThis = async (newTaskData: Prisma.TaskUpdateInput) => {
    const { data } = await axios.put<Task>(`/api/tasks/${id}`, newTaskData);
    updateTasks();
    return data;
  };

  return (
    <Todo>
      <DoneButton
        isDone={!!isDone}
        onClick={() => updateThis({ isDone: !isDone })}
      >
        <MdCheck />
      </DoneButton>
      <Text>
        {title}
        {text}
        {isTrash ? null : (
          <TrashButton onClick={() => updateThis({ isTrash: true })}>
            🗑️
          </TrashButton>
        )}
      </Text>
    </Todo>
  );
};

export default TodoTask;
