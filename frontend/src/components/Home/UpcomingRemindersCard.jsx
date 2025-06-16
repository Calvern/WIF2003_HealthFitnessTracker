import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { CalendarCheck, Clock, Bell } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";

const brandColor = "#176087";

const UpcomingRemindersCard = ({ reminders }) => {
  return (
    <Card
      className="h-100 shadow-sm mt-5"
      style={{
        borderRadius: "10px",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <Card.Header
        style={{
          fontWeight: "bold",
          fontSize: "1rem",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <CalendarCheck className="me-2" />
        <h5 className="fw-bold mb-0">Upcoming Reminders</h5>
      </Card.Header>

      <ListGroup variant="flush">
        <div>
          {reminders.length > 0 ? (
            reminders.map((reminder, idx) => (
              <Row
                key={idx}
                className="m-0 py-3 border-bottom"
                style={{ borderColor: "#f1f1f1" }}
              >
                {/* Title & Description */}
                <Col xs={12} md={5} className="mb-2 mb-md-0">
                  <div className="fw-semibold">{reminder.title}</div>
                  <small className="text-muted">{reminder.notes || ""}</small>
                </Col>

                {/* Time */}
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center gap-1 mb-2 mb-md-0"
                >
                  <Clock style={{ color: "#f39c12" }} />
                  <small>{reminder.time}</small>
                </Col>

                {/* Date */}
                <Col
                  xs={12}
                  md={4}
                  className="d-flex align-items-center gap-1 "
                >
                  <Bell style={{ color: brandColor }} />
                  <small>{reminder.date}</small>
                </Col>
              </Row>
            ))
          ) : (
            <div className="text-muted text-center py-3">
              No upcoming reminders.
            </div>
          )}
        </div>
      </ListGroup>
    </Card>
  );
};

export default UpcomingRemindersCard;
