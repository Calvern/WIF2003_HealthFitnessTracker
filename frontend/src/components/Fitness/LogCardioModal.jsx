import { Modal, Button, Form } from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";

const LogCardioModal = ({ show, onClose, cardio, log, setLog, onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      type: "cardio",
      name: cardio,
      date: log.date,
      startTime: log.time,
      duration: Number(log.duration),
      sets: null,
      reps: null,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">{cardio}</h1>
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
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 30"
              min={0}
              value={log.duration}
              onChange={(e) => setLog({ ...log, duration: e.target.value })}
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

export default LogCardioModal;
