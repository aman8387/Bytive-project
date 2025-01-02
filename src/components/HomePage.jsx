// src/components/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTasks } from '../redux/tasksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  // Fetch tasks from an API
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      dispatch(setTasks(data));
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/edit-task/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-task">Add New Task</Link>
    </div>
  );
};

export default HomePage;
