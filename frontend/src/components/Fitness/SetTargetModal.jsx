import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SetTargetModal = ({ show, onClose, onSave }) => {
  const [target, setTarget] = useState({
    steps: 0,
    workoutMinutes: 0,
  });

  const handleSave = (e) => {
    e.preventDefault();
    onSave(target); // Save the target data
    onClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold">Set Daily Target</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Daily Step Target</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={target.steps}
              onChange={(e) => setTarget({ ...target, steps: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Daily Workout Minutes Target</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={target.workoutMinutes}
              onChange={(e) =>
                setTarget({ ...target, workoutMinutes: e.target.value })
              }
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: "#507DBC" }}>
              Save Target
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SetTargetModal;
