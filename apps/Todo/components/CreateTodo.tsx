import styled from "styled-components";
import React, { useState } from "react";

const CreateTodo: React.FC = () => {
  const [text, setText] = useState<String>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div id="form">
    <form onSubmit={handleSubmit} id="createTodoForm">
      <input
        placeholder="My new task..."
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" value="Create New Todo" />
    </form>
    </div>
  );
};

export default CreateTodo;
