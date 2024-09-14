import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Events from './components/event.js';
import EventDetail from './components/eventDetails.js';
import RSVP from './components/rsvp.js';
import Notifications from './components/notification.js';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/rsvp" element={<RSVP />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
