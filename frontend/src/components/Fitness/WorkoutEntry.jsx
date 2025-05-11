import { Col, Row } from "react-bootstrap";

const WorkoutEntry = ({ date, workoutType, sets, reps, onClick }) => {
  const handleClick = () => {
    onClick({
      date,
      workoutType,
      sets,
      reps,
    });
  };

  return (
    <Row
      className=""
      style={{ backgroundColor: "#DAE3E5", cursor: "pointer" }}
      onClick={handleClick}
    >
      <Col
        className="py-2 d-flex align-items-center border border-1 border-white"
        xs={6}
      >
        <span>{workoutType}</span>
      </Col>
      <Col xs={6}>
        <Row>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{sets}</span>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{reps}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WorkoutEntry;
