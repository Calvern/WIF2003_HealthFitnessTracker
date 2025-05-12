import { useState, Fragment, use } from "react";
import {
  Button,
  Nav,
  OverlayTrigger,
  Popover,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Bell, GearFill, Plus, Book } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const NotificationsPopover = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Notification 1",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Browser",
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
      notes:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
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
      notificationMethod: "Email",
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
      notificationMethod: "Browser",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
  ];

  const reminderssss = [
    { id: 1, title: "Gym Day", time: "10:00 am", unread: true },
    { id: 2, title: "PushUp x 10 reps", time: "7:00 am", unread: false },
    { id: 3, title: "PushUp x 200 reps", time: "3:00 am", unread: false },
    { id: 4, title: "Swimming Day", time: "2:00 am", unread: true },
    { id: 5, title: "Gym Day", time: "1:00 am", unread: true },
    { id: 6, title: "PullUp", time: "8:00 am", unread: true },
    // Add more notifications as needed
  ];

  const reminders = [
    {
      id: 1,
      title: "Gym Day",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Browser",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 2,
      title: "PushUp x 10 reps",
      date: "2023-4-01",
      time: "12:00 AM",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Not Active",
    },
    {
      id: 3,
      title: "PushUp x 200 reps",
      date: "2023-10-01",
      time: "11:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 4,
      title: "Swimming Day",
      date: "2023-10-01",
      time: "08:00 AM",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notificationMethod: "Browser",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
  ];

  const handleShowNotifications = (notification) => {
    console.log(notification);
    navigate(`/notifications/show-notification/${notification.id}`, {
      state: { notification },
    });
  };

  const renderContent = () => {
    if (activeTab === "notifications") {
      return (
        <Container>
          <div className="d-flex flex-column">
            {notifications.slice(0, 3).map(
              (
                notification,
                index //--> Edit length here
              ) => (
                <Fragment key={notification.id}>
                  <div
                    className="notification-popover-item d-flex align-items-center  mb-2 position-relative"
                    onClick={() => handleShowNotifications(notification)}
                    style={{ cursor: "pointer" }}
                  >
                    <Bell size={20} />
                    <p className="mb-0" style={{ marginLeft: "60px" }}>
                      {notification.title.length > 10
                        ? `${notification.title.slice(0, 25)}...`
                        : notification.title}
                    </p>
                    {notification.reminderStatus === "Active" && (
                      <span
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          marginLeft: "8px",
                        }}
                      ></span>
                    )}
                  </div>
                  {index < notifications.length - 1 && (
                    <hr
                      style={{
                        width: "100%",
                        margin: "10px auto",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}
                </Fragment>
              )
            )}
          </div>
        </Container>
      );
    } else if (activeTab === "reminders") {
      return (
        <Container>
          <div className="d-flex flex-column">
            {reminders.slice(0, 3).map(
              (
                reminder,
                index //--> Edit length here
              ) => (
                <Fragment key={reminder.id}>
                  <div
                    className="d-flex align-items-center  mb-2 position-relative"
                    // onClick={() => handleShowNotifications(reminder)}
                    // style={{ cursor: "pointer" }}
                  >
                    <Book size={20} />
                    <p className="mb-0" style={{ marginLeft: "60px" }}>
                      {reminder.title.length > 10
                        ? `${reminder.title.slice(0, 10)}...`
                        : reminder.title}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 0,
                        fontSize: "10px",
                      }}
                    >
                      {reminder.time}
                    </div>
                  </div>
                  {index < reminders.length - 1 && (
                    <hr
                      style={{
                        width: "100%",
                        margin: "10px auto",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}
                </Fragment>
              )
            )}
          </div>
        </Container>
      );
    }
  };

  const popover = (
    <Popover id="popover-basic" style={{ minWidth: "300px" }}>
      <Popover.Header className="d-flex justify-content-between align-items-center bg-white">
        <Nav
          variant="underline"
          defaultActiveKey={activeTab}
          className="d-flex flex-row"
          onSelect={(eventKey) => setActiveTab(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="notifications">Notifications</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reminders">Reminders</Nav.Link>
          </Nav.Item>
        </Nav>
        {activeTab === "reminders" && (
          <Link to={"/create-reminder"}>
            <Plus color="black" size={32} />
          </Link>
        )}
      </Popover.Header>
      <Popover.Body>{renderContent()}</Popover.Body>
      <div className="popover-footer-link d-flex justify-content-center align-items-center py-2">
        <Link
          to={activeTab === "notifications" ? "/notifications" : "/reminders"}
          style={{ textDecoration: "none", color: "#176087" }}
        >
          See All
        </Link>
      </div>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={popover}
      show={showPopover}
      onToggle={(nextShow) => {
        setShowPopover(nextShow);
        if (!nextShow) {
          setActiveTab("notifications");
        }
      }}
      rootClose
    >
      <Button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setShowPopover(!showPopover)}
      >
        <Bell color="white" size={30} />
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationsPopover;
