import React, { useState } from 'react';

const RSVP = () => {
    const [rsvpData, setRsvpData] = useState({
        event: '',
        user: '',
        status: 'pending'
    });

    const handleChange = (e) => {
        setRsvpData({
            ...rsvpData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle RSVP submission
        fetch('http://localhost:8000/attendees/api/attendees/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rsvpData)
        })
        .then(response => response.json())
        .then(data => console.log('RSVP submitted:', data))
        .catch(error => console.error('Error submitting RSVP:', error));
    };

    return (
        <div>
            <h1>RSVP</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Event:
                    <input type="text" name="event" value={rsvpData.event} onChange={handleChange} />
                </label>
                <label>
                    User:
                    <input type="text" name="user" value={rsvpData.user} onChange={handleChange} />
                </label>
                <label>
                    Status:
                    <select name="status" value={rsvpData.status} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>
                </label>
                <button type="submit">Submit RSVP</button>
            </form>
        </div>
    );
};

export default RSVP;
