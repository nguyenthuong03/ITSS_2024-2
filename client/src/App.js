import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';
import TaskInput from './components/TaskInput';
import ProfilePage from './components/ProfilePage';
import RankPage from './components/RankPage';
import TaskHistoryPage from './components/TaskHistoryPage';
import NotificationModal from './components/NotificationModal';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-elasticbeanstalk-url.elasticbeanstalk.com' 
  : 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (task, time) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, time }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleStartTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/api/start-task/${taskId}`, {
        method: 'POST',
      });
      const task = await response.json();
      setCurrentTask(task);
      setShowTimer(true);
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/api/complete-task/${taskId}`, {
        method: 'POST',
      });
      const result = await response.json();
      if (result.success) {
        setShowTimer(false);
        setCurrentTask(null);
        setEarnedXP(result.xp);
        setShowNotification(true);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="App">
                <header className="App-header">
                  <h1>Task Manager</h1>
                </header>
                {!showTimer ? (
                  <>
                    <TaskInput onAddTask={handleAddTask} />
                    <TaskList tasks={tasks} onStartTask={handleStartTask} />
                  </>
                ) : (
                  <TaskTimer
                    task={currentTask}
                    onComplete={() => handleCompleteTask(currentTask.id)}
                  />
                )}
              </div>
            } />
            <Route path="/tasks" element={<TaskHistoryPage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <NotificationModal
          isOpen={showNotification}
          onClose={handleCloseNotification}
          xp={earnedXP}
        />
      </div>
    </Router>
  );
}

export default App; 