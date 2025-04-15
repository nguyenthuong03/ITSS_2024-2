import React from 'react';
import './TaskHistoryPage.css';

function TaskHistoryPage() {
  const completedTasks = [
    {
      id: 1,
      task: 'Hoàn thành bài tập React',
      time: '25 phút',
      completedDate: '01/03/2024',
      xp: 100
    },
    {
      id: 2,
      task: 'Đọc sách về JavaScript',
      time: '30 phút',
      completedDate: '28/02/2024',
      xp: 120
    },
    {
      id: 3,
      task: 'Luyện tập CSS',
      time: '20 phút',
      completedDate: '27/02/2024',
      xp: 80
    },
    {
      id: 4,
      task: 'Học về Redux',
      time: '45 phút',
      completedDate: '26/02/2024',
      xp: 150
    }
  ];

  return (
    <div className="task-history-container">
      <h1>Lịch sử nhiệm vụ</h1>
      
      <div className="stats-summary">
        <div className="stat-item">
          <h3>Tổng nhiệm vụ</h3>
          <p>{completedTasks.length}</p>
        </div>
        <div className="stat-item">
          <h3>Tổng thời gian</h3>
          <p>120 phút</p>
        </div>
        <div className="stat-item">
          <h3>Tổng XP</h3>
          <p>{completedTasks.reduce((sum, task) => sum + task.xp, 0)}</p>
        </div>
      </div>

      <div className="tasks-list">
        {completedTasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-info">
              <h3>{task.task}</h3>
              <p>Thời gian: {task.time}</p>
              <p>Hoàn thành: {task.completedDate}</p>
            </div>
            <div className="task-xp">
              <span>+{task.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskHistoryPage; 