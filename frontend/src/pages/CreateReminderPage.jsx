import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ChevronLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import ReminderForm from '../components/Notifications/ReminderForm';

const CreateReminderPage = () => {
  
  const [reminder, setReminder] = useState({
    title: '',
    date: '',
    time: '',
    category: '',
    leadTime: '',
    recurring: '',
    notificationMethod:'',
    notes:''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically submit your reminder data to a server
    // For now, let's just log the reminder to the console
    console.log(reminder);
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center ml-5 mt-3 mb-2" style={{ fontWeight: "bold", fontSize: "20px"}}>
        <Link to={"/reminders"}>
            <ChevronLeft size={40} style={{ marginRight: "4px"}}/>
        </Link>
        Create New Reminder
      </div>
      <ReminderForm
        reminder={reminder}
        setReminder={setReminder}
        handleSubmit={handleSubmit}
        mode = "create"
      />
    </Container>
  );
};

export default CreateReminderPage;