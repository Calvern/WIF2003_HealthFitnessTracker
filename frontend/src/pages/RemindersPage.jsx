import React from 'react';
import { Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const RemindersPage = () => {

  const [reminders, setReminders] = React.useState([]);
  const inputRef = React.useRef(null);

  const add = () => {
    const newReminder = inputRef.current.value;
    if (newReminder) {
      setReminders([...reminders, newReminder]);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <div className="d-flex align-items-between ml-5 mt-3" style={{ fontWeight: "bold", fontSize: "30px", marginLeft: '40px'}}>
        <div>Upcoming Reminders</div>
        <div className="d-flex align-items-center rounded" style={{ height: "40px", width: "40px", backgroundColor: "#507DBC", marginLeft: "15px"}}>
          <Link to={"/create-reminder"} aria-label="Create New Reminder">
            <Plus size={40} style={{ color: "white" }} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RemindersPage;