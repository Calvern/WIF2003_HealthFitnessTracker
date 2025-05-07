import { Col, Row } from "react-bootstrap";

const CardioEntry = ({ cardioType, minutes, calories }) => {
  return (
    <Row style={{ backgroundColor: "#DAE3E5" }}>
      <Col className="py-2 d-flex align-items-center" xs={6}>
        <span>{cardioType}</span>
      </Col>
      <Col xs={6}>
        <Row>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{minutes}</span>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
          >
            <span style={{ color: "#176087" }}>{calories}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CardioEntry;
