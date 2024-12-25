// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './Calendar.css'; // Custom CSS file for further customizations if needed

// const localizer = momentLocalizer(moment);

// const CalendarComponent = () => {
//   return (
//     <div className="h-[90vh] border-2 border-gray-700 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-green-400 m-6 rounded-xl shadow-lg">
//       <Calendar
//         localizer={localizer}
//         startAccessor="start"
//         endAccessor="end"
//         style={{
//           height: '100%',
//           backgroundColor: 'transparent', // Removes the white background
//         }}
//         className="rounded-lg text-gray-500" // Use Tailwind for further customization
//       />
//     </div>
//   );
// };

// export default CalendarComponent;


import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'; // Custom CSS file for further customizations if needed

const localizer = momentLocalizer(moment);

// Example of tasks/events
const myEventsList = [
  {
    title: 'Complete To-Do List Task',
    start: new Date(2024, 11, 26), // December 26, 2024
    end: new Date(2024, 11, 26), // Same day (one-day event)
  },
  {
    title: 'Team Meeting',
    start: new Date(2024, 11, 27, 10, 0), // December 27, 2024, at 10:00 AM
    end: new Date(2024, 11, 27, 11, 0), // December 27, 2024, at 11:00 AM
  },
  {
    title: 'Project Deadline',
    start: new Date(2024, 11, 30), // December 30, 2024
    end: new Date(2024, 11, 30),
  },
];

const CalenderComponent = () => {
  return (
    <div className="h-[90vh] border-2 border-gray-700 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-green-400 m-6 rounded-xl shadow-lg">
      <Calendar
        localizer={localizer}
        events={myEventsList} // Pass the tasks/events array here
        startAccessor="start"
        endAccessor="end"
        style={{
          height: '100%',
          backgroundColor: 'transparent', // Removes the white background
        }}
        className="rounded-lg text-gray-400" // Use Tailwind for further customization
      />
    </div>
  );
};

export default CalenderComponent;
