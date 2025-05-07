import { Container, CardTitle, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Bell } from "react-bootstrap-icons";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data
    const mockNotifications = [
      // {
      //   id: 1,
      //   title: "Notification 1",
      //   message: "This is the first notification.",
      //   date: "2023-10-01",
      // },
      // {
      //   id: 2,
      //   title: "Notification 2",
      //   message: "This is the second notification.",
      //   date: "2023-10-02",
      // }
    ];
    setNotifications(mockNotifications);
  }, []); // Empty dependency array means this effect runs once on mount

  const renderNotification = (notification) => {
    return (
      <div key={notification.id} className="notification-item">
        <h3>{notification.title}</h3>
        <p>{notification.message}</p>
        <small>{notification.date}</small>
      </div>
    );
  };

  const renderEmptyMessage = () => {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Card border="0" className="mb-3">
          <CardTitle style={{height:"100px", width:"100px", backgroundColor:"#DAE3E5", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center"}}>
           <Bell size={64} style={{backgroundColor:"#DAE3E5" }} />
          </CardTitle>
        </Card>
        
        <div className="text-center" style={{fontWeight:"bold", fontSize:"50px", color:"#9D9F9F" }}>
          No Notifications Yet
        </div>
        <div className="text-center" style={{fontWeight:"bold", fontSize:"20px", color:"#B9BFC0" }}>
          Stay Tuned!
        </div>
        <div className="text-center" style={{fontWeight:"bold", fontSize:"20px", color:"#B9BFC0" }}>
          Notifications about your activity will show up here.
        </div>
        </Container>
    );
  };

  return (
    <>
      {notifications.length > 0 ? notifications.map(renderNotification) : renderEmptyMessage()}
    </>
  );
};

export default NotificationsPage;