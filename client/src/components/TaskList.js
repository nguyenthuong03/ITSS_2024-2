import React, { useState } from 'react';

function TaskList({ tasks, onStartTask }) {
  return (
    <div className="task-list">
      <h2>Danh sách nhiệm vụ</h2>
      {tasks.length === 0 ? (
        <p>Chưa có nhiệm vụ nào</p>
      ) : (
        <ul>
          {tasks.map((group, indexx) => (
            <li key={indexx}>
              <h3>{group.title}</h3>
              <ul>
                {group.subtasks.map((task) => (
                  <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <div className="task-info">
                      <h4>{task.task}</h4>
                      <p>Thời gian: {task.time}</p>
                    </div>
                    {!task.completed && (
                      <button onClick={() => onStartTask(task.id)}>Bắt đầu</button>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default TaskList; 