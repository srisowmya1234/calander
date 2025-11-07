import React, { useState, useEffect } from "react";
import eventsData from "../data/events.json";
import "./Calender.css";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const getEventsForDate = (date) => {
    const formatted = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return events.filter((e) => e.date === formatted);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="day-header">{d}</div>
        ))}

        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} className="empty-cell"></div>
        ))}

        {[...Array(daysInMonth)].map((_, day) => {
          const date = day + 1;
          const dateEvents = getEventsForDate(date);
          return (
            <div
              key={date}
              className={`day-cell ${isToday(date) ? "today" : ""}`}
            >
              <div className="date-number">{date}</div>

              {dateEvents.length > 0 && (
                <div className="events">
                  {dateEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`event ${
                        dateEvents.length > 1 ? "conflict" : ""
                      }`}
                    >
                      {event.title} ({event.time})
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
