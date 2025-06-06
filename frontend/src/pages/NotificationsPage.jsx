import {
  Container,
  CardTitle,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { Bell, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const mockNotifications = [
    {
      id: 1,
      title: "Notification 1",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
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
      notes: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Not Active",
    },
    {
      id: 3,
      title: "Notification 3",
      date: "2023-10-01",
      time: "11:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 4,
      title: "Notification 4",
      date: "2023-10-01",
      time: "08:00 AM",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 5,
      title: "Notification 5",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "15 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 6,
      title: "Notification 6",
      date: "2023-10-01",
      time: "06:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Active",
    },
    {
      id: 7,
      title: "Notification 7",
      date: "2023-9-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 8,
      title: "Notification 8",
      date: "2023-9-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
  ];

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


  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredNotifications = notifications.filter((notification) => {
    return (
      filter === "all" ||
      (filter === "unread" && notification.reminderStatus === "Not Active")
    );
  });

  const handleShowNotifications = (notification) => {
    navigate(`/notifications/show-notification/${notification.id}`, {
      state: { notification },
    });
  };

  const renderEmptyMessage = () => {
    return (
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
        <div
          className="text-center"
          style={{ fontWeight: "bold", fontSize: "20px", color: "#B9BFC0" }}
        >
          Stay Tuned!
        </div>
        <div
          className="text-center"
          style={{ fontWeight: "bold", fontSize: "20px", color: "#B9BFC0" }}
        >
          Notifications about your activity will show up here.
        </div>
      </Container>
    );
  };

  const renderNotifications = () => {
    return (
      <div className="d-flex flex-column align-items-center mt-5 vh-100">
        {filteredNotifications.map((notification, index) => (
          <Fragment key={notification.id}>
            <div
              className="d-flex justify-content-between align-items-center mb-1"
              style={{ width: "80%" }}
            >
              <div
                className="reminder-status"
                style={{
                  backgroundColor:
                    notification.reminderStatus === "Active"
                      ? "#FF0000"
                      : "none",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
              <small
                style={{
                  cursor: "pointer",
                  fontWeight:
                    notification.reminderStatus === "Active"
                      ? "bold"
                      : "normal",
                }}
              >
                {notification.date}
              </small>
              <small
                style={{
                  cursor: "pointer",
                  fontWeight:
                    notification.reminderStatus === "Active"
                      ? "bold"
                      : "normal",
                }}
              >
                {notification.title}
              </small>
              <small
                onClick={() => handleShowNotifications(notification)}
                style={{
                  cursor: "pointer",
                  fontStyle: "italic",
                  textDecoration: "underline",
                  color:
                    notification.reminderStatus === "Active"
                      ? "#507DBC"
                      : "#B3B3B3",
                }}
              >
                See more
              </small>
            </div>
            {index < filteredNotifications.length - 1 && (
              <hr
                style={{
                  width: "80%",
                  margin: "10px auto",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div
        className="d-flex align-items-center gap-2 mt-3 mb-2"
        style={{ marginLeft: "40px" }}
      >
        <Button
          className="border border-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={30}></ChevronLeft>
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
              (notification) => notification.reminderStatus == "Not Active"
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
            <span style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: isEnabled ? "#28a745" : "#6c757d", // Green if enabled, grey if not
            }}>
              {isEnabled ? "Notifications Enabled" : "Enable Notifications"}
            </span>
          </Form>
        </div>


        <div className="d-flex justify-content-end align-items-center gap-3 px5">
      <div
          className={`d-flex align-items-center px-4 py-1 rounded-pill border ${
          filter === "all"
          ? "bg-success-subtle text-success fw-bold border-success"
          : "bg-success-subtle border-success"
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
                filter === "unread"
                  ? "bg-danger-subtle text-danger fw-bold border-danger"
                  : "bg-danger-subtle border-danger"
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
        

      {notifications.length === 0
        ? renderEmptyMessage()
        : renderNotifications()}
    </Container>
  );
};

export default NotificationsPage;
