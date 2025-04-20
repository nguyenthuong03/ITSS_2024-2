import React, { useState } from 'react';
import './TaskInput.css';

function TaskInput({ onAddTasks, onTaskChange }) {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim() || !time) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/breakdown-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, time }),
      });

      if (!response.ok) throw new Error('Failed to break down task');

      const data = await response.json();

      // Gửi toàn bộ subtasks lên App.js
      onAddTasks(data.subtasks);

      setTask('');
      setTime('');
    } catch (err) {
      setError('Có lỗi xảy ra khi chia nhỏ nhiệm vụ. Vui lòng thử lại.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            if (onTaskChange) onTaskChange(e.target.value);
          }}
          placeholder="Nhập nhiệm vụ..."
          disabled={isLoading}
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Thời gian (phút)"
          min="1"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Thêm nhiệm vụ'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}


export default TaskInput; 