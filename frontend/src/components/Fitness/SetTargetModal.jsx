import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDailyTarget } from "../../api/ExerciseApi";
import { useAppContext } from "../../contexts/AppContext";

const SetTargetModal = ({ show, onClose }) => {
  const { showToast } = useAppContext();
  const [target, setTarget] = useState({
    steps: "",
    workoutMinutes: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: setDailyTarget,
    onSuccess: () => {
      showToast("Daily target saved!");
      queryClient.invalidateQueries(["fetchUser"]);
      onClose();
    },
    onError: (error) => {
      showToast(error.message || "Failed to update target");
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    mutation.mutate({
      targetSteps: Number(target.steps),
      workoutMinutes: Number(target.workoutMinutes),
    });
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
              placeholder="Enter target"
              min="0"
              value={target.steps}
              onChange={(e) =>
                setTarget({
                  ...target,
                  steps: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Daily Workout Minutes Target</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter target"
              min="0"
              value={target.workoutMinutes}
              onChange={(e) =>
                setTarget({
                  ...target,
                  workoutMinutes: e.target.value,
                })
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