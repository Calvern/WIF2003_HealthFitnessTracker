import { Modal, Button, Form } from "react-bootstrap";
import { logExercise } from "../../api/ExerciseApi";

const LogWorkoutModal = ({ show, onClose, workout, log, setLog, onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type: "workout",
      name: workout,
      date: log.date,
      startTime: log.time,
      sets: Number(log.sets),
      reps: Number(log.reps),
      duration: null, // Explicitly null for cardio-only field
    };

    console.log("Submitting:", data);
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">{workout}</h1>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="e.g., 2023-10-01"
              value={log.date}
              onChange={(e) => setLog({ ...log, date: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="e.g., 14:30"
              value={log.time}
              onChange={(e) => setLog({ ...log, time: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Sets</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 3"
              min={0}
              value={log.sets}
              onChange={(e) => setLog({ ...log, sets: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Reps</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 12"
              min={0}
              value={log.reps}
              onChange={(e) => setLog({ ...log, reps: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#507DBC", color: "white" }}
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LogWorkoutModal;
