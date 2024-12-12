
import React, { useState, useEffect } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  return (
    <div className="app">
      <CalendarGrid
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        events={events}
        onDateClick={handleDateClick}
      />
      {modalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          events={events.filter((event) => event.date === selectedDate.toISOString().split("T")[0])}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
