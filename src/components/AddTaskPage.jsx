import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { useNavigate } from 'react-router-dom';

const AddTaskPage = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // Temporary ID
      title: title,
      completed: false,
    };

    // Add the task to Redux
    dispatch(addTask(newTask));

    // Mock API POST request
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    navigate('/'); // Redirect to HomePage
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Add Task</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="taskTitle"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Task Title
          </label>
          <textarea
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
