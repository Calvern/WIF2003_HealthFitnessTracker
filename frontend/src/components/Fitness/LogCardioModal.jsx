import { Modal, Button, Form } from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";
import { useQueryClient } from "@tanstack/react-query";

const LogCardioModal = ({ show, onClose, cardio, log, setLog, onSubmit }) => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date: log.date,
      cardio: [
        {
          name: cardio,
          startTime: log.time,
          duration: Number(log.duration),
        },
      ],
      workout: [],
    });
    queryClient.invalidateQueries(["weeklyAverages"]);
    queryClient.invalidateQueries(["cardioDuration"]);
    queryClient.invalidateQueries(["fetchUser"]);
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
              placeholder="Date"
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
              placeholder="Time"
              value={log.time}
              onChange={(e) => setLog({ ...log, time: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration"
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
