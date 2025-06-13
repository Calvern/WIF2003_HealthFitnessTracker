import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";

const ShowNotificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive notification data from location state
  const notification = location.state?.notification;

  if (!notification) {
    return (
      <Container className="text-center mt-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Link to={"/notifications"}>
            <ChevronLeft
              color="black"
              size={30}
              style={{ cursor: "pointer" }}
            />
          </Link>

          <h4 className="mb-0">No Notification Data</h4>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Link to={"/notifications"}>
          <ChevronLeft color="black" size={30} style={{ cursor: "pointer" }} />
        </Link>

        <h4 className="mb-0">Notification Details</h4>
      </div>

      <Card className="p-4 shadow-sm">
        <h5>{notification.title}</h5>
        <hr />

        <p><strong>Date:</strong> {notification.date}</p>
        <p><strong>Time:</strong> {notification.time}</p>
        <p><strong>Category:</strong> {notification.category}</p>
        <p><strong>Lead Time:</strong> {notification.leadTime}</p>
        <p><strong>Recurring:</strong> {notification.recurring}</p>
        <p><strong>Notes:</strong> {notification.notes}</p>

      </Card>
    </Container>
  );
};

export default ShowNotificationPage;
