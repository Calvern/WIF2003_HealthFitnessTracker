import React, { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

const StepsProgressPage = () => {
  const [steps, setSteps] = useState(9000);
  const [target, setTarget] = useState(20000);
  const [showModal, setShowModal] = useState(false);
  const [newTarget, setNewTarget] = useState(target);
  

  const percentage = (steps / target) * 100;
  const centerText =  percentage < 99 ? "You Almost There!" : "Awesome!";

  const handleSave = () => {
    setTarget(Number(newTarget));
    setShowModal(false);
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center gap-4">
      {/* Main Card */}
      <div
        className="bg-white p-4 rounded-3 d-flex flex-column align-items-center gap-3"
        style={{ width: "460px" }}
      >
        {/* Circular Steps Graph */}
        <div style={{ width: "440px", height: "440px" }}>
          <CircularProgressbarWithChildren
            value={percentage}
            strokeWidth={10}
            styles={buildStyles({ pathColor: "#507DBC", trailColor: "#eee" })}
          >
            <span className="fw-bold text-dark fs-3">{steps}</span>
            <span className="fw-bold text-dark">Steps</span>
          </CircularProgressbarWithChildren>
        </div>

        {/* Motivation Text */}
        <h4 className="text-dark fw-bold text-center mb-1">{centerText}</h4>

        {/* Target Text with Edit */}
        <div className="text-dark fw-bold d-flex align-items-center gap-1">
          Target: {target.toLocaleString()} steps
          <Button
            variant="link"
            className="text-dark p-0"
            onClick={() => setShowModal(true)}
          >
            <Pencil />
          </Button>
        </div>
      </div>

      {/* Edit Target Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter your new target!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Enter steps target"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="py-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSave}
            className="w-100 fw-bold text-center"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StepsProgressPage;