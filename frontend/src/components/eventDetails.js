import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/events/${id}/`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event:', error));
    }, [id]);

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
        </div>
    );
};

export default EventDetail;
