import React from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    level: 'Bạch Kim',
    xp: 2500,
    completedTasks: 45,
    joinDate: '01/01/2023'
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>👤</span>
        </div>
        <h1>{user.name}</h1>
        <p className="user-level">{user.level}</p>
      </div>
      
      <div className="profile-stats">
        <div className="stat-card">
          <h3>Tổng XP</h3>
          <p>{user.xp}</p>
        </div>
        <div className="stat-card">
          <h3>Nhiệm vụ đã hoàn thành</h3>
          <p>{user.completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Ngày tham gia</h3>
          <p>{user.joinDate}</p>
        </div>
      </div>

      <div className="profile-info">
        <h2>Thông tin cá nhân</h2>
        <div className="info-item">
          <span>Email:</span>
          <p>{user.email}</p>
        </div>
        <div className="info-item">
          <span>Cấp độ hiện tại:</span>
          <p>{user.level}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 