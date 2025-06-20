import { Modal, Button, Form } from "react-bootstrap";
import { logExercise } from "../../api/ExerciseApi";

const LogWorkoutModal = ({ show, onClose, workout, log, setLog, onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      date: log.date,
      workout: [
        {
          name: workout,
          startTime: log.time,
          sets: Number(log.sets),
          reps: Number(log.reps),
        },
      ],
      cardio: [],
    });

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
              max={new Date().toISOString().split("T")[0]}
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
              placeholder="Sets"
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
              placeholder="Reps"
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
