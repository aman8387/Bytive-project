// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTaskPage from './components/AddTaskPage';
import EditTaskPage from './components/EditTaskPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addtask" element={<AddTaskPage />} />
        <Route path="/edittask/:taskId" element={<EditTaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;
