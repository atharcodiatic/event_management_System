import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/notifications/');
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data.message
            ]);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
