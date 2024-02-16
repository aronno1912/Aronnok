import React, { useState } from 'react';
import './Calender.css'

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = () => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const generateCalendar = () => {
    const totalDays = daysInMonth(date.getFullYear(), date.getMonth());
    const startingDay = startOfMonth();
    const daysArray = [];
  
    // Fill the array with empty slots for the days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null);
    }
  
    // Fill the array with the days of the month
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }
  
    return daysArray;
  };

  const renderCalendarRows = () => {
    const calendar = generateCalendar();
    const rows = [];
  
    for (let i = 0; i < calendar.length; i += 7) {
      const row = calendar.slice(i, i + 7);
      rows.push(
        <tr key={i / 7}>
          {row.map((day, index) => (
            <td key={index}>{day !== null ? day : ''}</td>
          ))}
        </tr>
      );
    }
  
    return rows;
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div>
      <h2>{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
      <table className='calender'>
        <thead>
          <tr className='calender-table-header'>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
        {renderCalendarRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
