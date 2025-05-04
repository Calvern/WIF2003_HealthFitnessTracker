import { Col, Row } from "react-bootstrap";

const MealEntries = ({ foodName, calories, carbs, fat, protein }) => {
  return (
    <Row className="" style={{ backgroundColor: "#DAE3E5" }}>
      <Col className="py-2 d-flex align-items-center" xs={6}>
        <span>{foodName}</span>
      </Col>
      <Col xs={6}>
        <Row>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{calories}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{carbs}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{fat}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{protein}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MealEntries;
