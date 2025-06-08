import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardioExercise, deleteExercise } from "../../api/ExerciseApi";

const CardioDetailsModal = ({
  show,
  onClose,
  log,
  setLog,
  onSubmit,
  onDelete,
}) => {
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: editExercise } = useMutation({
    mutationFn: updateCardioExercise,
    onSuccess: () => {
      queryClient.invalidateQueries(["exercises"]);
    },
    onError: (err) => {
      console.error("Update failed:", err.message);
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    editExercise({
      id: log.id,
      data: {
        date: log.date,
        startTime: log.startTime,
        duration: log.duration,
      },
    });

    setEditMode(false);
    onClose();
  };

  const { mutate: removeExercise } = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries(["exercises"]); // Refresh the list
    },
    onError: (err) => {
      console.error("Delete failed:", err.message);
    },
  });

  const handleDelete = (id) => {
    removeExercise(id);
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
                value={log.startTime}
                onChange={(e) => setLog({ ...log, startTime: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={log.duration}
                onChange={(e) => setLog({ ...log, duration: e.target.value })}
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
              <strong>Duration:</strong> {log.duration} minutes
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
                <Button variant="danger" onClick={handleDelete}>
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
