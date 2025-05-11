import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const WorkoutDetailsModal = ({ show, onClose, log, setLog, onSubmit }) => {
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
          <h1 className="fw-bold">{log.workout}</h1>
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
              <Form.Label>Sets</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={log.sets}
                onChange={(e) => setLog({ ...log, sets: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reps</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={log.reps}
                onChange={(e) => setLog({ ...log, reps: e.target.value })}
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
            <p>
              <strong>Date:</strong> {log.date}
            </p>
            <p>
              <strong>Start Time:</strong> {log.time}
            </p>
            <p>
              <strong>Number of Sets:</strong> {log.sets}
            </p>
            <p>
              <strong>Number of Reps:</strong> {log.reps}
            </p>
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

export default WorkoutDetailsModal;
