import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  FormLabel,
} from "react-bootstrap";

const LogStepsForm = ({ steps, setSteps, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formDate" className="mb-3">
            <FormLabel>Date</FormLabel>
            <FormControl
              type="date"
              value={steps.date}
              onChange={(e) => setSteps({ ...steps, date: e.target.value })}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="formDevice" className="mb-3">
            <FormLabel>Device Used</FormLabel>
            <Form.Select
              value={steps.device}
              onChange={(e) => setSteps({ ...steps, device: e.target.value })}
            >
              <option value="">Select a device</option>
              <option value="Phone">Phone</option>
              <option value="Watch">Watch</option>
              <option value="Manual Count">Manual Count</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formSteps" className="mb-3">
            <FormLabel>Steps</FormLabel>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setSteps((prev) => ({
                    ...prev,
                    steps: Math.max(0, parseInt(prev.steps || 0) - 1),
                  }))
                }
              >
                −
              </Button>
              <FormControl
                type="number"
                className="text-center"
                value={steps.steps}
                onChange={(e) =>
                  setSteps({
                    ...steps,
                    steps: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setSteps((prev) => ({
                    ...prev,
                    steps: parseInt(prev.steps || 0) + 1,
                  }))
                }
              >
                +
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="formDay" className="mb-3">
            <FormLabel>Time of Day</FormLabel>
            <Form.Select
              value={steps.day}
              onChange={(e) => setSteps({ ...steps, day: e.target.value })}
            >
              <option value="">Select a time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="All Day">All Day</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button
        variant="primary"
        type="submit"
        className="d-block mx-auto mt-3 py-2 px-4"
        style={{ backgroundColor: "#507DBC" }}
      >
        Log Steps
      </Button>
    </Form>
  );
};

export default LogStepsForm;