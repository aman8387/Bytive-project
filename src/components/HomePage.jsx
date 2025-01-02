// src/components/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTasks } from '../redux/tasksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Task Manager</h1>
      <ul className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="py-4 flex justify-between items-center">
            <Link
              to={`/edittask/${task.id}`}
              className="text-lg font-medium text-gray-800 hover:text-blue-500"
            >
              {task.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/addtask"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Add New Task
      </Link>
    </div>
  );
};

export default HomePage;
