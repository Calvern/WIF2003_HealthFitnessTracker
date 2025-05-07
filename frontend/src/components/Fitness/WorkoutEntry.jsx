import { Col, Row } from "react-bootstrap";

const WorkoutEntry = ({ workoutType, set, rep }) => {
  return (
    <Row className="" style={{ backgroundColor: "#DAE3E5" }}>
      <Col className="py-2 d-flex align-items-center" xs={6}>
        <span>{workoutType}</span>
      </Col>
      <Col xs={6}>
        <Row>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{set}</span>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{rep}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WorkoutEntry;
