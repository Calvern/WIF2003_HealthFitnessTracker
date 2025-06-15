import { useState, Fragment, useEffect } from "react";
import { Button, Nav, OverlayTrigger, Popover, Container } from "react-bootstrap";
import { Bell, Plus, Book } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetReminders, useGetNotifications, useHandleShowNotifications } from "../../api/ReminderApi";

const NotificationsPopover = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const { reminders: fetchedReminders, isLoading: remindersLoading } = useGetReminders();
  const { notifications: fetchedNotifications, isLoading: notificationsLoading, refetch: refetchNotifications } = useGetNotifications();
  const handleShowNotifications = useHandleShowNotifications();

  const handleNotificationClick = async (notification) => {
    if (!notification.readStatus) {
      await handleShowNotifications(notification);
      await refetchNotifications();
    }
    navigate(`/notifications/show-notification/${notification._id}`, {
      state: { notification },
    });
  };

  const renderContent = () => {
    if (activeTab === "notifications") {
      // Filter unread notifications and sort by date and time
      const unreadNotifications = [...(fetchedNotifications || [])]
        .filter(notification => !notification.readStatus)
        .sort((a, b) => {
          // Combine date and time for more accurate sorting
          const dateTimeA = new Date(`${a.date} ${a.time}`);
          const dateTimeB = new Date(`${b.date} ${b.time}`);
          return dateTimeB - dateTimeA;
        });

      return (
        <Container>
          <div className="d-flex flex-column">
            {unreadNotifications.slice(0, 3).map((notification, index) => (
              <Fragment key={notification._id}>
                <div
                  className="notification-popover-item d-flex align-items-center mb-2 position-relative"
                  onClick={() => handleNotificationClick(notification)}
                  style={{ cursor: "pointer" }}
                >
                  <Bell size={20} />
                  <div style={{ marginLeft: "60px" }}>
                    <p className="mb-0">
                      {notification.title.length > 10
                        ? `${notification.title.slice(0, 25)}...`
                        : notification.title}
                    </p>
                    <small className="text-muted">
                      {notification.date} at {notification.time}
                    </small>
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "8px",
                      height: "8px",
                    }}
                  />
                </div>
                {index < Math.min(2, (unreadNotifications.length || 0) - 1) && (
                  <hr
                    style={{
                      margin: "8px 0",
                      border: "none",
                      borderTop: "1px solid #ddd",
                    }}
                  />
                )}
              </Fragment>
            ))}
            {(!unreadNotifications || unreadNotifications.length === 0) && (
              <p className="text-center">No new notifications</p>
            )}
          </div>
        </Container>
      );
    } else if (activeTab === "reminders") {
      // Filter actual reminders
      const reminders = fetchedReminders?.filter(reminder => reminder.type === "reminder") || [];

      return (
        <Container>
          <div className="d-flex flex-column">
            {reminders.slice(0, 3).map((reminder, index) => (
              <Fragment key={reminder._id}>
                <div className="d-flex align-items-center mb-2 position-relative">
                  <Book size={20} />
                  <div style={{ marginLeft: "60px" }}>
                    <p className="mb-0">
                      {reminder.title.length > 10
                        ? `${reminder.title.slice(0, 25)}...`
                        : reminder.title}
                    </p>
                    <small className="text-muted">
                      {reminder.date} at {reminder.time}
                    </small>
                  </div>
                </div>
                {index < reminders.length - 1 && (
                  <hr
                    style={{
                      margin: "8px 0",
                      border: "none",
                      borderTop: "1px solid #ddd",
                    }}
                  />
                )}
              </Fragment>
            ))}
            {reminders.length === 0 && (
              <p className="text-center">No reminders</p>
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
        {fetchedReminders?.some(
          (reminder) => reminder.type === "notification" && !reminder.readStatus
        ) && (
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "8px",
                height: "8px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
          )}
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationsPopover;
