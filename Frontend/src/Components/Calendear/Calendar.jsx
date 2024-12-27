import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Custom CSS file for further customizations if needed
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  
  
  
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('userId')
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post('http://localhost:3000/task/getdueDateTask', {
          userId
        });
        const tasks = response.data;
        
        const events = tasks.map(task => ({
          title: task.name,
          start: new Date(task.startDate || task.dueDate),
          end: new Date(task.dueDate),
        }));
        
        setEvents(events);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  },[]); // Empty dependency array ensures it runs once on mount
  
  return (
    <div className="h-[80vh]">

    <div className="h-[79vh] overflow-y-auto border-2 border-gray-700 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-green-400 m-6 rounded-xl shadow-lg overflow-auto">
      <Calendar
        localizer={localizer}
        events={events} // Use the events state from the API
        startAccessor="start"
        endAccessor="end"
        style={{
          height: '100%',
          backgroundColor: 'transparent', // Removes the white background
        }}
        className="rounded-lg text-gray-400" // Use Tailwind for further customization
        />
    </div>
        </div>
  );
};

export default CalendarComponent;






// const myEventsList = [
//   {
//     title: 'Complete To-Do List Task',
//     start: new Date(2024, 11, 26), // December 26, 2024
//     end: new Date(2024, 11, 26), // Same day (one-day event)
//   },
//   {
//     title: 'Team Meeting',
//     start: new Date(2024, 11, 27, 10, 0), // December 27, 2024, at 10:00 AM
//     end: new Date(2024, 11, 27, 11, 0), // December 27, 2024, at 11:00 AM
//   },
//   {
//     title: 'Project Deadline',
//     start: new Date(2024, 11, 30), // December 30, 2024
//     end: new Date(2024, 11, 30),
//   },
// ];
