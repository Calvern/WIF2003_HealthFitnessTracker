import { Container, CardTitle, Card } from "react-bootstrap";
import { useEffect, useState, Fragment} from "react";
import { Bell, ChevronLeft, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const hasNotifications = notifications.length > 0;  // Check if there are any notifications

  useEffect(() => {
    // Mock data
    const mockNotifications = [
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
        notes: "This is the first notification.",
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
        reminderStatus: "Active",
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
      {
        id: 6,
        title: "Notification 6",
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
        id: 7,
        title: "Notification 7",
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
        id: 8,
        title: "Notification 8",
        date: "2023-10-01",
        time: "10:00 AM",
        category: "General",
        leadTime: "5 minutes",
        recurring: "Every Monday",
        notificationMethod: "Email",
        notes: "This is the first notification.",
        reminderStatus: "Not Active",
      }
    ];
    setNotifications(mockNotifications);
  }, []); // Empty dependency array means this effect runs once on mount

  const renderNotifications = () => {
    return (
      <div className="notifications-list d-flex flex-column align-items-center mt-5 vh-100">
        {notifications.map((notification, index) => (
          <Fragment key={notification.id}>
            <div className="notification-item d-flex justify-content-between align-items-center mb-1" style={{ width: "80%" }}>
              {notification.reminderStatus === "Active" ? (
                <>
                <div className="reminder-status" style={{backgroundColor:"#FF0000", width:"10px", height:"10px", borderRadius:"50%"}}></div>
                <small style={{cursor:"pointer", fontWeight:"bold"}}>{notification.date}</small>
                <small style={{cursor:"pointer", fontWeight:"bold"}}>{notification.title}</small>
                <Pencil size={10} style={{ cursor: "pointer" }} onClick={() => alert("Edit Notification")} />
                </>
              )
              : (
              <>
              <div className="reminder-status" style={{texrDecoration:"none", width:"10px", height:"10px", borderRadius:"50%"}}></div>
              <small style={{cursor:"pointer"}}>{notification.date}</small>
              <small>{notification.title}</small>
              <Pencil size={10} style={{ cursor: "pointer" }} onClick={() => alert("Edit Notification")} />
              </>)}
            </div>
            {index < notifications.length - 1 && <hr style={{ width: "80%", margin: "0 auto", borderColor: "#ccc", border: "1px solid #000000"}} />}
          </Fragment>
        ))}
      </div>
    );
  };

  const renderEmptyMessage = () => {
    return (
      <Container className="d-flex flex-column align-items-center py-5 mt-5 vh-100">
        <Card border="0" className="mb-3">
          <CardTitle style={{ height: "100px", width: "100px", backgroundColor: "#DAE3E5", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Bell size={64} style={{ backgroundColor: "#DAE3E5" }} />
          </CardTitle>
        </Card>
        <div className="text-center" style={{ fontWeight: "bold", fontSize: "50px", color: "#9D9F9F" }}>
          No Notifications Yet
        </div>
        <div className="text-center" style={{ fontWeight: "bold", fontSize: "20px", color: "#B9BFC0" }}>
          Stay Tuned!
        </div>
        <div className="text-center" style={{ fontWeight: "bold", fontSize: "20px", color: "#B9BFC0" }}>
          Notifications about your activity will show up here.
        </div>
      </Container>
    );
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center ml-5 mt-3 mb-2" style={{ fontWeight: "bold", fontSize: "30px", marginLeft: '40px' }}>
        <Link to={"/reminders"}>
          <ChevronLeft style={{ marginRight: "4px" }} />
        </Link>
        Notifications
      </div>
      {!hasNotifications ? renderEmptyMessage() : renderNotifications()}
    </Container>
  );
};

export default NotificationsPage;