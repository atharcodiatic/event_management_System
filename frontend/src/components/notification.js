
import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [sockets, setSocket] = useState(null);

    let socket = new WebSocket('ws://localhost:8001/ws/test/');

socket.onopen = function(e) {
  console.log("[open] WebSocket connected");
  socket.send(JSON.stringify({'message':'message3'}))
};

socket.onmessage = function(event) {
    let data = JSON.parse(event.data)

  console.log(`[message] Data received from server at frontend : ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] WebSocket connection closed cleanly, code=${event.code}`);
  } else {
    console.log('[close] WebSocket connection unexpectedly closed');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

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
