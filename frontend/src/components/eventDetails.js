import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/events/api/events/${id}/`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event:', error));
    }, [id]);

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h1>Event Name : {event.title}</h1>
            <p>description : {event.description}</p>
            <p> Event Starting from : {event.start_time}</p>
            <p> Event ending : {event.end_time}</p>
        </div>
    );
};

export default EventDetail;
