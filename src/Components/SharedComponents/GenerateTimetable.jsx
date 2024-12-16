import React, { useState } from 'react';
import './GenerateTimetable.css';

const GenerateTimetable = ({user}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:30 - 10:30',
    '10:30 - 12:30',
    '14:30 - 16:30',
    '16:30 - 18:30',
  ];
  const rooms = Array.from({ length: 20 }, (_, i) => `H${i + 1}`);
  const [timetable, setTimetable] = useState(
    Array(days.length).fill().map(() => Array(timeSlots.length).fill({ course: '', room: '' }))
  );

  const handleUpdate = (dayIndex, slotIndex, field, value) => {
    const updatedTimetable = timetable.map((day, dIndex) =>
      dIndex === dayIndex
        ? day.map((slot, sIndex) =>
            sIndex === slotIndex ? { ...slot, [field]: value } : slot
          )
        : day
    );
    setTimetable(updatedTimetable);
  };

  return (
    <div className="timetable-container">
      <h2>Timetable Management</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td>{day}</td>
              {timeSlots.map((_, slotIndex) => (
                <td key={slotIndex}>
                  <select
                    value={timetable[dayIndex][slotIndex].course}
                    onChange={(e) =>
                      handleUpdate(dayIndex, slotIndex, 'course', e.target.value)
                    }
                  >
                    <option value="">Select a course</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                  <select
                    value={timetable[dayIndex][slotIndex].room}
                    onChange={(e) =>
                      handleUpdate(dayIndex, slotIndex, 'room', e.target.value)
                    }
                  >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button
            className="save-button"
            onClick={() => console.log('Timetable saved:', timetable)}
        >
            Save Timetable
        </button>
        <button
        className="save-button"
        onClick={() => {
          window.location.href = '/timetable';
        }}
      >
        View TimeTable
      </button>
      </div>
      
    </div>
  );
};

export default GenerateTimetable;
