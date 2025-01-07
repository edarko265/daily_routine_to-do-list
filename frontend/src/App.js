import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
