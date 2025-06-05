import { Modal, Button, Form } from "react-bootstrap";

const LogStepsModal = ({ show, onClose, steps, log, setLog, onSubmit }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">Log Steps</h1>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
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
            <Form.Label>Steps</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 300"
              min={0}
              value={log.sets}
              onChange={(e) => setLog({ ...log, sets: e.target.value })}
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

export default LogStepsModal;
