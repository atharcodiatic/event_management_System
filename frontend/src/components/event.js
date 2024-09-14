import React, { useState, useEffect } from 'react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', start_time: '', end_time: '' });
    const [editEvent, setEditEvent] = useState(null);

    // Fetch events
    useEffect(() => {
        fetch('http://localhost:8000/events/api/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    // Handle input change for the create event form
    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    // Create a new event
    const handleCreate = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/events/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => response.json())
            .then(data => {
                setEvents([...events, data]);
                setNewEvent({ title: '', description: '', start_time: '', end_time: '' }); // Clear form
            })
            .catch(error => console.error('Error creating event:', error));
    };

    // Delete an event
    const handleDelete = (id) => {
        fetch(`http://localhost:8000/events/api/${id}/`, {
            method: 'DELETE',
        })
            .then(() => {
                setEvents(events.filter(event => event.id !== id));
            })
            .catch(error => console.error('Error deleting event:', error));
    };

    // Handle input change for the edit event form
    const handleEditChange = (e) => {
        setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    };

    // Edit an event
    const handleEdit = (id) => {
        fetch(`http://localhost:8000/events/api/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editEvent),
        })
            .then(response => response.json())
            .then(data => {
                setEvents(events.map(event => (event.id === id ? data : event)));
                setEditEvent(null); // Clear edit form
            })
            .catch(error => console.error('Error editing event:', error));
    };

    return (
        <div>
            <h1>Events</h1>

            {/* Create event form */}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="start_time"
                    placeholder="Start Time"
                    value={newEvent.start_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="end_time"
                    placeholder="End Time"
                    value={newEvent.end_time}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Event</button>
            </form>

            <ul>
                Event List 
                {events.map(event => (
                    <li key={event.id}>
                        {editEvent && editEvent.id === event.id ? (
                            // Edit event form
                            <form onSubmit={() => handleEdit(event.id)}>
                                <input
                                    type="text"
                                    name="title"
                                    value={editEvent.title}
                                    onChange={handleEditChange}
                                />
                                <textarea
                                    name="description"
                                    value={editEvent.description}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="datetime-local"
                                    name="start_time"
                                    value={editEvent.start_time}
                                    onChange={handleEditChange}
                                    required
                                />
                                <input
                                    type="datetime-local"
                                    name="end_time"
                                    value={editEvent.end_time}
                                    onChange={handleEditChange}
                                    required
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <>
                                <a href={`/events/${event.id}`}>{event.title}</a>
                                <p>Start Time: {event.start_time}</p>
                                <p>End Time: {event.end_time}</p>
                                <button onClick={() => setEditEvent(event)}>Edit</button>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
