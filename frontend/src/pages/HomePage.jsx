import { Col, Container, Row } from "react-bootstrap";
import BMICard from "../components/Home/BMICard";
import StepsProgressCard from "../components/Home/StepsProgressCard";
import TargetCalorieCard from "../components/Home/TargetCalorieCard";
import FitnessProgressCard from "../components/Home/FitnessProgressCard";
import BarChart from "../components/Home/BarChart";

const HomePage = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-5">Welcome back, Loiue</h1>
      <Row className="justify-content-center gap-5 mb-5">
        <Col xs={12} lg={3}>
          <FitnessProgressCard />
        </Col>
        <Col xs={12} lg={3}>
          <StepsProgressCard />
        </Col>
        <Col xs={12} lg={3}>
          <TargetCalorieCard />
        </Col>
      </Row>
      <Row>
        <BarChart />
      </Row>
    </Container>
  );
};

export default HomePage;
