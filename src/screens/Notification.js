import React from 'react';
import './Notification.css'; // Make sure to create this CSS file for styling

export default function Notification({ message, onClose }) {
    return (
        <div className="notification">
            <div className="notification-header">
                <h4>Success!</h4>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="notification-body">
                {message}
            </div>
        </div>
    );
}
