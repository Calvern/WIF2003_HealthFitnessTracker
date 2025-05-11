import { Col, Container, Row } from "react-bootstrap";
import StepsProgressPage from "../components/Performance/StepsProgressPage";
import DateNavigator from "../components/Performance/DateNavigator";
import { useState } from "react";

const StepsPage = () => {
  const [date, setDate] = useState(new Date("2025-04-24"));

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <DateNavigator date={date} setDate={setDate} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={20} md={16} lg={12}>
          <StepsProgressPage />
        </Col>
      </Row>
    </Container>
  );
};

export default StepsPage;
