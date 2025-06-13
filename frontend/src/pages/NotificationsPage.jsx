import { Container, CardTitle, Card, Form, Button } from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { Bell, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetNotifications } from "../api/ReminderApi";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const { notifications: fetchedNotifications, isLoading, error, refetch } = useGetNotifications();

  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications); // Update state with fetched data
    }
  }, [fetchedNotifications]);

  // Toggle notifications permission
  const handleToggle = () => {
    if (!isEnabled) {
      // Ask for browser notification permission
      if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setIsEnabled(true);
            new Notification("Notifications Enabled", {
              body: "You will now receive notifications.",
            });
          }
        });
      } else {
        setIsEnabled(true);
      }
    } else {
      setIsEnabled(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  
  const filteredNotifications = notifications.filter((notification) => {
    return (
      filter === "all" || 
      (filter === "unread" && notification.readStatus === false)  // Only show unread notifications
    );
  });


  const handleShowNotifications = (notification) => {
    navigate(`/notifications/show-notification/${notification._id}`, {
      state: { notification },
    });
  };

  const renderEmptyMessage = () => (
    <Container className="d-flex flex-column align-items-center py-5 mt-5 vh-100">
      <Card border="0" className="mb-3">
        <CardTitle
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: "#DAE3E5",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Bell size={64} style={{ backgroundColor: "#DAE3E5" }} />
        </CardTitle>
      </Card>
      <div
        className="text-center"
        style={{ fontWeight: "bold", fontSize: "50px", color: "#9D9F9F" }}
      >
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

  // Render notifications based on the filter
  const renderNotifications = () => (
    <div className="d-flex flex-column align-items-center mt-5 vh-100" style={{ overflowY: "auto", maxHeight: "400px", width: "100%", paddingRight: "30px", scrollBehavior: "smooth"}}>
      {filteredNotifications.map((notification, index) => (
        <Fragment key={notification._id}>
          <div className="d-flex justify-content-between align-items-center mb-1" style={{ width: "80%" }}>
            <div
              className="reminder-status"
              style={{
                backgroundColor: notification.readStatus ? "#808080" : "#FF0000",  // Green if read, red if not
                width: "10px",
                height: "10px",
                borderRadius: "50%",
              }}
            ></div>

            <div style={{ flex:1, marginLeft:"30px"}}>
             <small style={{ cursor: "pointer", fontWeight: notification.readStatus ? "normal" : "bold" }}>
              {notification.date} {notification.time}
            </small> 
            </div>
            
            <div style={{ flex:2 }}>
              <small style={{ cursor: "pointer", fontWeight: notification.readStatus ? "normal" : "bold" }}>
              {notification.title}
            </small>
            </div>

            <div style={{ justifyContent: 'end'}}>
              <small
              onClick={() => handleShowNotifications(notification)}
              style={{
                cursor: "pointer",
                fontStyle: "italic",
                textDecoration: "underline",
                color: notification.readStatus ? "#6c757d" : "#507DBC",
              }}
            >
              See more
            </small>
            </div>
            
            
          </div>
          {index < filteredNotifications.length - 1 && (
            <hr style={{ width: "80%", margin: "10px auto", border: "1px solid #ccc" }} />
          )}
        </Fragment>
      ))}
    </div>
  );

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-2 mt-3 mb-2" style={{ marginLeft: "40px" }}>
        <Button
          className="border border-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={30} />
        </Button>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          Notifications
        </span>

        {filter === "all" && notifications.length > 0 && (
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {notifications.filter(
              (notification) => notification.readStatus === false
            ).length}
          </span>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center px-5">
        <div className="d-flex justify-content-start align-items-center px-5">
          <Form className="d-flex align-items-center gap-3 bg-light px-3 py-2 rounded-pill shadow-sm">
            <Form.Check
              type="switch"
              id="notification-switch"
              label=""
              checked={isEnabled}
              onChange={handleToggle}
              className="m-0"
              style={{ transform: "scale(1.2)" }}
            />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: isEnabled ? "#28a745" : "#6c757d",
              }}
            >
              {isEnabled ? "Notifications Enabled" : "Enable Notifications"}
            </span>
          </Form>
        </div>

        <div className="d-flex justify-content-end align-items-center gap-3 px-5">
          <div
            className={`d-flex align-items-center px-4 py-1 rounded-pill border ${
              filter === "all" ? "bg-success-subtle text-success fw-bold border-success" : "bg-success-subtle border-success"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleFilterChange("all")}
          >
            <Form.Check
              inline
              type="radio"
              label="All"
              name="notificationMethod"
              value="all"
              checked={filter === "all"}
              onChange={() => handleFilterChange("all")}
              style={{ pointerEvents: "none" }}
            />
          </div>

          <div
            className={`d-flex align-items-center px-4 py-1 rounded-pill border ${
              filter === "unread" ? "bg-danger-subtle text-danger fw-bold border-danger" : "bg-danger-subtle border-danger"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleFilterChange("unread")}
          >
            <Form.Check
              inline
              type="radio"
              label="Unread"
              name="notificationMethod"
              value="unread"
              checked={filter === "unread"}
              onChange={() => handleFilterChange("unread")}
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </div>

      {notifications.length === 0 ? renderEmptyMessage() : renderNotifications()}
    </Container>
  );
};

export default NotificationsPage;
