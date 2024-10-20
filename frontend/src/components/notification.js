
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [sockets, setSocket] = useState(null);
    let navigate = useNavigate();
    let socket = new WebSocket('ws://localhost:8001/ws/notifications/');
    
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/notifications/api/notifications/"); // Replace with your API URL
            if (response.ok) {
              const data = await response.json();
              setNotifications([...data]); 
            } else {
              console.error('Failed to fetch notifications');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData(); 
      }, []);

    

socket.onopen = function(e) {
  console.log("[open] WebSocket connected");
  socket.send(JSON.stringify({'message':'message3'}))
};

socket.onmessage = function(event) {
    let data = JSON.parse(event.data)

  console.log(`[message] Data received from server at frontend : ${event.data}`);
};
function sendMessage(notification_id, event_id){
    socket.send(JSON.stringify({'notification_id': notification_id}))
    console.log(notification_id , 'PPPPPPPPPPPPPPlllll')
    navigate(`/events/${notification_id}`)
    return 

}

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
            <ul >
                {notifications.map((notification, index) => (
                    <li style={{height:'40px', width:'380px', margin:'20px', border:'30px', background:'grey'}} key={index} onClick ={()=>sendMessage(notification.id, notification.event)}>{`${notification.message} > event_id ${notification.event}`}</li>
                ))}
            </ul>

        </div>
    );
};

export default Notifications;
