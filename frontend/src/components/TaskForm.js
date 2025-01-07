import React, { useState } from 'react';

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error adding task");
        return res.json();
      })
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
        setTitle('');
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TaskForm;
