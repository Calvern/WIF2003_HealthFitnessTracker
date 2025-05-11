import { Col, Row } from "react-bootstrap";

const CardioEntry = ({ date, cardioType, minutes, calories, onClick }) => {
  const handleClick = () => {
    onClick({
      date,
      cardioType,
      minutes,
      calories,
    });
  };

  return (
    <Row
      style={{ backgroundColor: "#DAE3E5", cursor: "pointer" }}
      onClick={handleClick}
    >
      <Col
        className="py-2 d-flex align-items-center border border-1 border-white"
        xs={6}
      >
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
