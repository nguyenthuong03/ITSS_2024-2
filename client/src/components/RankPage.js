import React from 'react';
import './RankPage.css';

function RankPage() {
  const ranks = [
    { name: 'Kim Cương', minXP: 5000, color: '#e0e0e0' },
    { name: 'Bạch Kim', minXP: 3000, color: '#e5e4e2' },
    { name: 'Vàng', minXP: 2000, color: '#ffd700' },
    { name: 'Bạc', minXP: 1000, color: '#c0c0c0' },
    { name: 'Đồng', minXP: 0, color: '#cd7f32' }
  ];

  const users = [
    { name: 'Nguyễn Văn A', xp: 5200, rank: 'Kim Cương' },
    { name: 'Trần Thị B', xp: 4800, rank: 'Bạch Kim' },
    { name: 'Lê Văn C', xp: 3500, rank: 'Bạch Kim' },
    { name: 'Phạm Thị D', xp: 2500, rank: 'Vàng' },
    { name: 'Hoàng Văn E', xp: 1500, rank: 'Bạc' },
    { name: 'Đỗ Thị F', xp: 800, rank: 'Bạc' },
    { name: 'Vũ Văn G', xp: 500, rank: 'Đồng' }
  ];

  return (
    <div className="rank-container">
      <h1>Bảng xếp hạng</h1>
      
      <div className="rank-levels">
        <h2>Các cấp độ</h2>
        <div className="levels-grid">
          {ranks.map((rank, index) => (
            <div key={index} className="level-card" style={{ backgroundColor: rank.color }}>
              <h3>{rank.name}</h3>
              <p>Từ {rank.minXP} XP</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rank-list">
        <h2>Top người chơi</h2>
        <table>
          <thead>
            <tr>
              <th>Hạng</th>
              <th>Tên</th>
              <th>XP</th>
              <th>Cấp độ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.xp}</td>
                <td>{user.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankPage; 