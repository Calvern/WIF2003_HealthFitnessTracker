import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CardioDetailsModal = ({ show, onClose, log, setLog, onSubmit }) => {
    console.log(" entry clicked:", log);

  const [editMode, setEditMode] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(); // Call parent handler
    setEditMode(false); // Return to view mode
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">{log.cardio}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {editMode ? (
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={log.date}
                onChange={(e) => setLog({ ...log, date: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={log.time}
                onChange={(e) => setLog({ ...log, time: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={log.minutes}
                onChange={(e) => setLog({ ...log, sets: e.target.value })}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button type="submit" style={{ backgroundColor: "#507DBC" }}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          <>
            <p><strong>Date:</strong> {log.date}</p>
            <p><strong>Start Time:</strong> {log.time}</p>
            <p><strong>Duration:</strong> {log.duration} minutes</p>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <div>
                <Button
                  style={{ backgroundColor: "#507DBC" }}
                  onClick={() => setEditMode(true)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button variant="danger">
                  Remove
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CardioDetailsModal;