import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  const tasksOnSelectedDate = tasks.filter(task =>
    new Date(task.dueDate).toDateString() === date.toDateString()
  );

  return (
    <div>
      <h1>Task Calendar</h1>
      <Calendar onChange={onChange} value={date} />
      <h2>Tasks on {date.toDateString()}:</h2>
      <ul>
        {tasksOnSelectedDate.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
