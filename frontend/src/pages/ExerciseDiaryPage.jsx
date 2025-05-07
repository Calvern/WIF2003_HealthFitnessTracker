import { forwardRef, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CardioEntry from "../components/Fitness/CardioEntry";
import WorkoutEntry from "../components/Fitness/WorkoutEntry";
import DateNavigator from "../components/Fitness/DateNavigator";
import { Pencil } from "react-bootstrap-icons";
import CalendarForm from "../components/Nutrition/CalendarForm";

import "react-datepicker/dist/react-datepicker.css";

const ExerciseDiaryPage = () => {
  const [steps, setSteps] = useState(29000); // setSteps function to update steps
  const brandColor = "#176087";

  return (
    <Container className="py-5">
     <CalendarForm/>
      <div className="d-flex align-items-center justify-content-left gap-2 mt-5">
        <h2 className="fw-bold m-0" style={{ color: brandColor }}>
          Total Steps: {steps}
        </h2>
        <Button variant="transparent" size="md">
          <Pencil color={brandColor} />
        </Button>
      </div>

      {/* Cardiovascular Header */}
      <SectionHeader
        title="Cardiovascular"
        leftLabel="Minutes"
        rightLabel="Calories Burned"
        color={brandColor}
      />
      <CardioEntry cardioType="Running" minutes="30" calories="465" />
      <AddExerciseLink />

      <hr className="mt-2" style={{ brandColor }} />
      <Row className="mt-2 align-items-center text-center justify-content-end">
        <Col xs={6}>
          <Row>
            <p
              className="text-end fw-bold"
              style={{ color: brandColor, height: "100%" }}
            >
              Daily Total / Goal
            </p>{" "}
          </Row>
          <Row>
            <p
              className="text-end fw-bold m-0 d-flex align-items-center justify-content-end"
              style={{ color: brandColor, height: "100%" }}
            >
              Weekly Total / Goal
            </p>{" "}
          </Row>
        </Col>
        <Col xs={6}>
          <Row>
            <Col
              xs={6}
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{color: "#176087"}}>0/1000</p>
            </Col>
            <Col
              xs={6}
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{color: "#176087"}}>0/1000</p>
            </Col>
          </Row>

          {/* Weekly Total / Goal Row */}
          <Row>
            <Col
              xs={6}
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{color: "#176087"}}>0/1000</p>
            </Col>
            <Col
              xs={6}
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{color: "#176087"}}>0/200</p>
            </Col>
          </Row>
        </Col>
      </Row>

      <SectionHeader
        title="Strength Training"
        leftLabel="Sets"
        rightLabel="Reps"
        color={brandColor}
      />
      <WorkoutEntry workoutType="Push Up" set="3" rep="10" />
      <AddExerciseLink />

      {/* Notes */}
      <h3 className="fw-bold mt-5" style={{ color: brandColor }}>
        Notes:
      </h3>
      <Form.Group className="mb-3 border-1 border-black">
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Add any notes or comments here..."
          style={{ backgroundColor: "#DAE3E5" }}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="d-block mx-auto mt-3 py-2 px-4"
        style={{ backgroundColor: brandColor }}
      >
        Save
      </Button>
    </Container>
  );
};

// Reusable section header
const SectionHeader = ({ title, leftLabel, rightLabel, color }) => (
  <Row className="mt-5 align-items-center">
    <Col xs={6}>
      {title && (
        <h2 className="fw-bold m-0" style={{ color }}>
          {title}
        </h2>
      )}
    </Col>
    <Col xs={6}>
      <Row>
        <Col
          xs={6}
          className="py-3 border border-1 border-white"
          style={{ backgroundColor: color }}
        >
          <p className="text-center text-white m-0">{leftLabel}</p>
        </Col>
        <Col
          xs={6}
          className="py-3 border border-1 border-white"
          style={{ backgroundColor: color }}
        >
          <p className="text-center text-white m-0">{rightLabel}</p>
        </Col>
      </Row>
    </Col>
  </Row>
);

// Reusable link
const AddExerciseLink = () => (
  <Row className="mt-2">
    <Col xs={6}>
      <Link to="#" style={{ textDecoration: "none", color: "#176087" }}>
        Add Exercise
      </Link>
    </Col>
  </Row>
);

export default ExerciseDiaryPage;
