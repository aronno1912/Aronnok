// import React, { useState } from 'react';
// import './Calender.css'

// const Calendar = () => {
//   const [date, setDate] = useState(new Date());

//   const daysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const startOfMonth = () => {
//     const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//     return firstDay.getDay();
//   };

//   const generateCalendar = () => {
//     const totalDays = daysInMonth(date.getFullYear(), date.getMonth());
//     const startingDay = startOfMonth();
//     const daysArray = [];
  
//     // Fill the array with empty slots for the days before the first day of the month
//     for (let i = 0; i < startingDay; i++) {
//       daysArray.push(null);
//     }
  
//     // Fill the array with the days of the month
//     for (let i = 1; i <= totalDays; i++) {
//       daysArray.push(i);
//     }
  
//     return daysArray;
//   };

//   const renderCalendarRows = () => {
//     const calendar = generateCalendar();
//     const rows = [];
  
//     for (let i = 0; i < calendar.length; i += 7) {
//       const row = calendar.slice(i, i + 7);
//       rows.push(
//         <tr key={i / 7}>
//           {row.map((day, index) => (
//             <td key={index}>{day !== null ? day : ''}</td>
//           ))}
//         </tr>
//       );
//     }
  
//     return rows;
//   };

//   const handlePrevMonth = () => {
//     setDate(new Date(date.getFullYear(), date.getMonth() - 1));
//   };

//   const handleNextMonth = () => {
//     setDate(new Date(date.getFullYear(), date.getMonth() + 1));
//   };

//   return (
//     <div>
//       <h2>{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
//       <table className='calender'>
//         <thead>
//           <tr className='calender-table-header'>
//             <th>Sun</th>
//             <th>Mon</th>
//             <th>Tue</th>
//             <th>Wed</th>
//             <th>Thu</th>
//             <th>Fri</th>
//             <th>Sat</th>
//           </tr>
//         </thead>
//         <tbody>
//         {renderCalendarRows()}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Calendar;

// Calendar.js

import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [inputMonth, setInputMonth] = useState(date.getMonth() + 1);
  const [inputYear, setInputYear] = useState(date.getFullYear());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startOfMonth = () => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateCalendar = (year, month) => {
    const totalDays = daysInMonth(year, month);
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

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleJumpToMonthYear = () => {
    if (inputMonth >= 1 && inputMonth <= 12 && inputYear >= 1000 && inputYear <= 9999) {
      setDate(new Date(inputYear, inputMonth - 1));
    } else {
      alert('Invalid input for month or year');
    }
  };

  const renderCalendarRows = () => {
    const calendar = generateCalendar(date.getFullYear(), date.getMonth());
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = new Date().getDate(); // Get the current day of the month
    const rows = [];
  
    for (let i = 0; i < calendar.length; i += 7) {
      const row = calendar.slice(i, i + 7);
      rows.push(
        <tr key={i / 7}>
          {row.map((day, index) => (
            <td key={index} className={day === currentDay && currentMonth === date.getMonth() ? 'current-day' : ''}>
              {day !== null ? day : ''}
            </td>
          ))}
        </tr>
      );
    }
  
    return rows;
  };
  
  return (
    <div className="calendar-container">
      <h2>{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
      
      <div className='cal-month-year'>
        <label className='cal-month-input'>
          Month:<br/>
          <input style={{width:'80px'}}
            type="number"
            value={inputMonth}
            onChange={(e) => setInputMonth(parseInt(e.target.value, 10))}
          />
        </label>
        <label className='cal-year-input'>
          Year:<br/>
          <input style={{width:'80px'}}
            type="number"
            value={inputYear}
            onChange={(e) => setInputYear(parseInt(e.target.value, 10))}
          />
        </label>
        <button onClick={handleJumpToMonthYear} style={{height:'30px', marginTop:'25px'}}>go</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendarRows()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
