// src/components/EditTaskPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../redux/tasksSlice';

const EditTaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(state => state.tasks.tasks.find(t => t.id === parseInt(taskId)));

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = { ...task, title: title };

    dispatch(updateTask(updatedTask));
    navigate('/'); // Redirect to HomePage after updating the task
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskPage;
