import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../redux/tasksSlice';

const EditTaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === parseInt(taskId))
  );

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = { ...task, title: title };

    // Update the task in Redux
    dispatch(updateTask(updatedTask));

    // Mock API PUT request
    await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    navigate('/'); // Redirect to HomePage
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">Task not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Task</h1>
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
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
