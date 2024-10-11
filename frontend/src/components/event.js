import React, { useState, useEffect } from 'react';

const Events = () => {
    let [events, setEvents] = useState([]);
    let [newEvent, setNewEvent] = useState({ title: '', description: '', start_time: '', end_time: '' });
    let [editEvent, setEditEvent] = useState(null);

    // Fetch events
    useEffect(() => {
        fetch('http://localhost:8000/events/api/events/')
            .then(response => response.json())
            .then(data => {console.log(data);
                 setEvents(Object.values(data));
                console.log(events)})
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    // Handle input change for the create event form
    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    // Create a new event
    const handleCreate = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/events/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => response.json())
            .then(data => {
                
                setEvents([...events, data]); // correction
                setNewEvent({ title: '', description: '', start_time: '', end_time: '' }); // Clear form
            })
            .catch(error => console.error('Error creating event:', error));
    };

    // Delete an event
    const handleDelete = (id) => {fetch('http://localhost:8000/events/api/events/')
    .then(response => response.json())
        fetch(`http://localhost:8000/events/api/events/${id}/`, {
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
        fetch(`http://localhost:8000/events/api/events/${id}/`, {
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
            <p>{Array.isArray(events) }</p>
            <p>{ events.length }</p>
            
            {/* Create event form */}
            <form onSubmit={handleCreate}>
                title: <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={handleChange}
                    required
                />
                description : <textarea
                    name="description"
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                />
                start time: <input
                    type="datetime-local"
                    name="start_time"
                    placeholder="Start Time"
                    value={newEvent.start_time}
                    onChange={handleChange}
                    required
                />
                end time: <input
                    type="datetime-local"
                    name="end_time"
                    placeholder="End Time"
                    value={newEvent.end_time}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Event</button>
                
            </form>
            
            
            { events.length > 0 ?(<ul>
                
                Event List

                {events.map(event => (
                    <li key={event.id}>
                        {editEvent && editEvent.id === event.id ? (
                                // Edit form for the selected event
                                <form onSubmit={() => handleEdit(event.id)}>
                                    title: <input
                                        type="text"
                                        name="title"
                                        value={editEvent.title}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    description : <textarea
                                        name="description"
                                        value={editEvent.description}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    start time: <input
                                        type="datetime-local"
                                        name="start_time"
                                        value={editEvent.start_time}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    end time: <input
                                        type="datetime-local"
                                        name="end_time"
                                        value={editEvent.end_time}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditEvent(null)}>Cancel</button>
                                </form>
                            ) : (
                        
                        <>
                        <a href={`/events/${event.id}`}>{event.title}</a>
                        <p>Start Time: {event.start_time}</p>
                        <p>End Time: {event.end_time}</p>
                        <p>Description : {event.description}</p>
                        <button onClick={() => setEditEvent(event)}>Edit</button>
                        <button onClick={() => handleDelete(event.id)}>Delete</button>  
                        </>)}
                    </li>
                                )
                        )
                }
            </ul>) : (<h1> No Events</h1>) }
        </div>
    );
};

export default Events;
