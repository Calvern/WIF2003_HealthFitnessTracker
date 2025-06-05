import { useState } from "react";
import { Button, Badge, Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import CalendarForm from "../components/Nutrition/CalendarForm";
import LogStepsModal from "../components/Fitness/LogStepsModal";
import WorkoutEntry from "../components/Fitness/WorkoutEntry";
import CardioEntry from "../components/Fitness/CardioEntry";
import CardioDetailsModal from "../components/Fitness/CardioDetailsModal";
import WorkoutDetailsModal from "../components/Fitness/WorkoutDetailsModal";
import SetTargetModal from "../components/Fitness/SetTargetModal";
import "react-datepicker/dist/react-datepicker.css";

const brandColor = "#176087";

const ExerciseDiaryPage = () => {
  const [steps, setSteps] = useState(0);
  const [log, setLog] = useState({ date: "", steps: "" });

  const [showStepsModal, setShowStepsModal] = useState(false);
  const [showCardioModal, setShowCardioModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showSetTargetModal, setShowSetTargetModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSteps = parseInt(log.steps) || 0;
    setSteps((prev) => prev + newSteps);
    setLog({ date: "", steps: "" });
    setShowStepsModal(false);
  };

  const handleCardioEntryClick = (entryData) => {
    const { date, cardioType, minutes, calories } = entryData;
    setLog({
      date,
      cardio: cardioType,
      duration: minutes,
      calories,
      time: "00:00", // default time
    });
    setShowCardioModal(true);
  };

  const handleWorkoutEntryClick = (entryData) => {
    const { date, workoutType, sets, reps } = entryData;
    setLog({
      date,
      workout: workoutType,
      sets: sets,
      reps: reps,
      time: "00:00", // default time
    });
    setShowWorkoutModal(true);
  };

  return (
    <Container className="py-5">
      <CalendarForm />
      {/* Steps Tracker */}
      <div className="d-flex align-items-center justify-content-left gap-2 mt-5">
        <h2 className="fw-bold m-0" style={{ color: brandColor }}>
          Total Steps: {steps}
        </h2>
        <Button
          variant="transparent"
          size="md"
          onClick={() => setShowStepsModal(true)}
        >
          <Pencil color={brandColor} />
        </Button>

        <LogStepsModal
          show={showStepsModal}
          onClose={() => setShowStepsModal(false)}
          steps={steps}
          log={log}
          setLog={setLog}
          onSubmit={handleSubmit}
        />
        <Badge bg="success" className="py-2 px-3">
          500 calories burned
        </Badge>

        <Button
          style={{ backgroundColor: brandColor }}
          size="md"
          className="ms-auto"
          onClick={() => setShowSetTargetModal(true)} // Make sure this is a function call
        >
          Set Target
        </Button>
      </div>
      <h2 className="fw-bold m-0" style={{ color: brandColor }}>
          Goal: 1000
        </h2>
      <SetTargetModal
          show={showSetTargetModal}
          onClose={() => setShowSetTargetModal(false)}
          onSave={(target) => {
            console.log("Target saved:", target);
            setShowSetTargetModal(false);
          }}
        />

      {/* Strength Training */}
      <SectionHeader
        title="Strength Training"
        leftLabel="Sets"
        rightLabel="Reps"
        color={brandColor}
      />
      <WorkoutEntry
        date="2023-01-01"
        workoutType="Push Up"
        sets="3"
        reps="10"
        onClick={handleWorkoutEntryClick}
      />
      <WorkoutEntry
        date="2023-01-01"
        workoutType="Squat"
        sets="3"
        reps="10"
        onClick={handleWorkoutEntryClick}
      />
      <WorkoutEntry
        date="2023-01-01"
        workoutType="Bench Press"
        sets="3"
        reps="10"
        onClick={handleWorkoutEntryClick}
      />
      <WorkoutDetailsModal
        show={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        log={log}
        setLog={setLog}
        onSubmit={() => {
          setShowWorkoutModal(false);
        }}
      />
      <Col xs={6} className="mt-2">
        <Link
          to="/fitness-log-workout"
          style={{ textDecoration: "none", color: brandColor }}
        >
          Add Exercise
        </Link>
      </Col>

      {/* Cardiovascular */}
      <SectionHeader
        title="Cardiovascular"
        leftLabel="Minutes"
        rightLabel="Calories Burned"
        color={brandColor}
      />
      <CardioEntry
        date="2023-01-01"
        cardioType="Running"
        minutes="30"
        calories="465"
        onClick={handleCardioEntryClick}
      />

      <CardioEntry
        date="2023-01-01"
        cardioType="Cycling"
        minutes="45"
        calories="500"
        onClick={handleCardioEntryClick}
      />

      <CardioDetailsModal
        show={showCardioModal}
        onClose={() => setShowCardioModal(false)}
        log={log}
        setLog={setLog}
        onSubmit={() => {
          setShowCardioModal(false);
        }}
      />

      <Row className="mt-2">
        <Col xs={6}>
          <Link
            to="/fitness-log-cardio"
            style={{ textDecoration: "none", color: brandColor }}
          >
            Add Exercise
          </Link>
        </Col>
        <Col xs={3}>
          <p className="text-center m-0" style={{ color: brandColor }}>
            75
          </p>
        </Col>
        <Col xs={3}>
          <p className="text-center m-0" style={{ color: brandColor }}>
            965
          </p>
        </Col>
      </Row>

      {/* Total Calories */}
      <hr className="mt-2" style={{ borderColor: brandColor }} />
      <Row className="mt-2 align-items-center text-center justify-content-end">
        <Col xs={6}>
          <Row>
            <h3 className="text-end fw-bold m-0" style={{ color: brandColor }}>
              Total
            </h3>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                75
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                1465
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Target
      <Row className="mt-0 align-items-center text-center justify-content-end">
        <Col xs={6}>
          <Row>
            <h3 className="text-end fw-bold m-0" style={{ color: brandColor }}>
              Target
            </h3>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                100
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                2000
              </p>
            </Col>
          </Row>
        </Col>
      </Row> */}
      {/* Remaining */}
      {/* <Row className="mt-0 align-items-center text-center justify-content-end">
        <Col xs={6}>
          <Row>
            <h3 className="text-end fw-bold m-0" style={{ color: brandColor }}>
              Remaining
            </h3>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                25
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Row>
            <Col
              className="py-2 border border-1 border-white"
              style={{ backgroundColor: "#DAE3E5" }}
            >
              <p className="text-center m-0" style={{ color: brandColor }}>
                535
              </p>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </Container>
  );
};

// Reusable SectionHeader component
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

export default ExerciseDiaryPage;
