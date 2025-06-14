import { Modal, Button, Form } from "react-bootstrap";
import { logDailySteps } from "../../api/ExerciseApi";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import { use } from "react";

const LogStepsModal = ({ show, onClose, steps, log, setLog, onSubmit }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  useEffect(() => {
    if (show) {
      setLog({
        date: "",
        steps: "",
      });
    }
  }, [show]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await logDailySteps({
        ...log,
        steps: Number(log.steps),
      });
      showToast("Steps logged successfully!");
      onClose();
      queryClient.invalidateQueries(["exercises"]);
    } catch (err) {
     showToast("Failed to log steps");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">Log Steps</h1>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
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
            <Form.Label>Steps</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your steps"
              min={0}
              value={log.steps}
              onChange={(e) => setLog({ ...log, steps: e.target.value })}
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
