import React, { useState, useEffect } from 'react';
import '../css/Notification.css'

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // 3秒后自动关闭提示框

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="notification">
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;