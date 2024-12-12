// File: src/components/EventModal.jsx
import React, { useState } from "react";
import "./EventModal.css";

const EventModal = ({ date, events, onAddEvent, onEditEvent, onDeleteEvent, onClose }) => {
  const [newEvent, setNewEvent] = useState({ name: "", startTime: "", endTime: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      ...newEvent,
      date: date.toISOString().split("T")[0],
      id: Date.now(),
    });
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
  };

  return (
    <div className="event-modal">
      <h3>Events for {date.toDateString()}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          required
        />
        <input
          type="time"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
          required
        />
        <input
          type="time"
          value={newEvent.endTime}
          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
          required
        />
        <textarea
          placeholder="Description (Optional)"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>{event.name}</p>
            <p>
              {event.startTime} - {event.endTime}
            </p>
            <p>{event.description}</p>
            <button onClick={() => onEditEvent({ ...event, name: "Updated Name" })}>Edit</button>
            <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventModal;
