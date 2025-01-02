// src/components/AddTaskPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { useNavigate } from 'react-router-dom';

const AddTaskPage = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // Temporary ID
      title: title,
      completed: false,
    };

    dispatch(addTask(newTask));
    navigate('/'); // Redirect to HomePage after adding the task
  };

  return (
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
