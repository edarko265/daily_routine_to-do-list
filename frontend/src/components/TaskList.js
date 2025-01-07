import React, { useState } from 'react';

function TaskList({ tasks, setTasks }) {
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error deleting task");
        setTasks((prev) => prev.filter((task) => task._id !== id));
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.title}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </ul>
  );
}

export default TaskList;
