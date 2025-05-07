
import {
  Container,
  CardTitle,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { Bell, ChevronLeft, ChevronDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

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
    {
      id: 6,
      title: "Notification 6",
      date: "2023-10-01",
      time: "10:00 AM",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notificationMethod: "Email",
      notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Active",
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

  const handleEdit = (id) => {
    const notification = notifications.find((n) => n.id === id);
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
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
              <ChevronDown
                size={10}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(notification.id)}
              />
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
        <Link to={"/home"}>
          <ChevronLeft size={40} style={{ marginRight: "4px" }} />
        </Link>
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
            {notifications.length}
          </span>
        )}
      </div>

      <div className="d-flex justify-content-end align-items-center gap-3 px-5">
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

      {notifications.length === 0 ? (
        renderEmptyMessage()
      ) : (
        renderNotifications()
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification && (
            <>
              <p><strong>Title:</strong> {selectedNotification.title}</p>
              <p><strong>Date:</strong> {selectedNotification.date}</p>
              <p><strong>Time:</strong> {selectedNotification.time}</p>
              <p><strong>Category:</strong> {selectedNotification.category}</p>
              <p><strong>Lead Time:</strong> {selectedNotification.leadTime}</p>
              <p><strong>Recurring:</strong> {selectedNotification.recurring}</p>
              <p><strong>Notification Method:</strong> {selectedNotification.notificationMethod}</p>
              <p><strong>Notes:</strong> {selectedNotification.notes}</p>
              {/* <p><strong>Status:</strong> {selectedNotification.reminderStatus}</p> */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NotificationsPage;
