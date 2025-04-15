import React from 'react';
import './NotificationModal.css';

function NotificationModal({ isOpen, onClose, xp }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Chúc mừng!</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="success-icon">🎉</div>
          <p>Bạn đã hoàn thành nhiệm vụ!</p>
          <div className="xp-reward">
            <span className="xp-amount">+{xp}</span>
            <span className="xp-label">XP</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="continue-button" onClick={onClose}>
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal; 