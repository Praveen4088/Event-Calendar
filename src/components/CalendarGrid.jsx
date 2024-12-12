import React from "react";
import { getDaysInMonth, startOfMonth, addMonths, subMonths } from "date-fns";
import "./CalendarGrid.css";

const CalendarGrid = ({ currentDate, setCurrentDate, events, onDateClick }) => {
  const startDay = startOfMonth(currentDate).getDay(); // Get the starting day of the month (0 = Sunday, 6 = Saturday)
  const daysInMonth = getDaysInMonth(currentDate);

  const daysArray = Array.from({ length: startDay + daysInMonth }, (_, index) => {
    const day = index - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // Fix for identifying weekends based on Sunday (0) and Saturday (6)
  const isWeekend = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay(); // Get the actual day of the week for the day
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  return (
    <div className="calendar-grid">
      <header className="calendar-header">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="calendar-button">Previous</button>
        <h2 className="calendar-title">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="calendar-button">Next</button>
      </header>
      <div className="calendar-days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}
        {daysArray.map((day, index) => {
          return (
            <div
              key={index}
              className={`calendar-day ${isToday(day) ? "today" : ""} ${isWeekend(day) ? "weekend" : "weekday"}`}
              onClick={() => day && onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
