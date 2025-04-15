import React, { useState, useEffect } from 'react';

function TaskTimer({ task, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(parseInt(task.time) * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="task-timer">
      <h2>Đang thực hiện: {task.task}</h2>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        <button onClick={onComplete}>Hoàn thành</button>
      </div>
    </div>
  );
}

export default TaskTimer; 