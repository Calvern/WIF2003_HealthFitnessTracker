import { useEffect, useState, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Plus, ChevronLeft, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const RemindersPage = () => {

  const [reminders, setReminders] = useState([]);
  
  const mockReminders = [
    {
      id: 1,
      title: "Notification 1",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 2,
      title: "Notification 2",
      date: "2023-4-01",
      time: "12:00 AM",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Not Active",
    },
    {
      id: 3,
      title: "Notification 3",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 4,
      title: "Notification 4",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 5,
      title: "Notification 5",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
  ]

  useEffect(() => {
    setReminders(mockReminders);
  }, []);


  const handleEdit = (id)=>{
    const reminder = reminders.find((n) => n.id === id)
    alert(`Reminder with id ${reminder.id} is choose for edit`)
    console.log(`Reminder with id ${reminder.id} is choose for edit`);
  }


  const renderReminders = () => {
    return(
      <div className='d-flex flex-column align-items-center mt-5 vh-100'>
        {reminders.map((reminder, index)=>
          <Fragment key={reminder.id}>
            <div className='d-flex justify-content-between align-items-center mb-1' style={{ width: "80%" }}>
            <small
                style={{
                  cursor: "pointer"
                }}
              >
                {reminder.time}
              </small>
              <small
                style={{
                  cursor: "pointer",
                }}
              >
                {reminder.title}
              </small>
              <Pencil
                  size={10}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(reminder.id)}
               />
            </div>
            {index < reminders.length - 1 && (
              <hr
              style={{
                width: "80%",
                margin: "10px auto",
                border: "1px solid #ccc",
              }}
            />
            )}
          </Fragment>
        )}
        <hr
              style={{
                width: "80%",
                margin: "10px auto",
                border: "1px solid #ccc",
              }}
            />
        <div className='d-flex justify-content-center align-items-center mt-5' style={{fontWeight:"bold", fontSize:"30px"}}>
          No More
        </div>
      </div>
    )
  }



  return (
    <Container className='py-5'>
      <div className="d-flex align-items-between ml-5 mt-3" style={{ fontWeight: "bold", fontSize: "20px"}}>
        <Link to={"/home"}>
                  <ChevronLeft size={40} style={{ marginRight: "4px" }} />
                </Link>
        <div>Upcoming Reminders</div>
        <div className="d-flex align-items-center rounded" style={{ height: "40px", width: "40px", backgroundColor: "#507DBC", marginLeft: "15px"}}>
          <Link to={"/create-reminder"} aria-label="Create New Reminder">
            <Plus size={40} style={{ color: "white" }} />
          </Link>
        </div>
      </div>

      {reminders.length > 0 ? 
      renderReminders()
      : ""}

    </Container>
  );
};

export default RemindersPage;