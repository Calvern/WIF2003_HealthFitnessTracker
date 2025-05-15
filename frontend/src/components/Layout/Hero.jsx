import { Container, Row, Col } from "react-bootstrap";
import hero from "../../assets/Hero.png";
import fitness from "../../assets/FitnessTracker.png";
import nutrition from "../../assets/Nutrition.png";
import progress from "../../assets/Progress.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${hero})`,
          height: "700px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container className="d-flex flex-column align-items-center text-center">
          <h1 className="fw-bold mb-3" style={{ color: "#176087" }}>
            Your Journey to a Healthier Life
            <span className="d-block">Begins Here</span>
          </h1>
          <h3 className="w-50">
            Track your workouts, monitor your nutrition, and visualize your progress
          </h3>
          <Link to="/sign-in" className="link-button">
            Get Started
          </Link>
        </Container>
      </div>
      <div className="py-3" style={{ backgroundColor: "#0A2239" }}>
        <Container>
          <h1 className="text-center fw-bold mb-0" style={{ color: "white" }}>
            Feature Highlights
          </h1>
        </Container>
      </div>
      <Container fluid>
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-center text-center features-padding"
            style={{
              backgroundImage: `url(${fitness})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="fw-bold">Fitness Tracker</h2>
            <h3>
              Log your workouts, track your steps, and monitor your daily
              activity easily
            </h3>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-center text-center features-padding "
            style={{
              backgroundImage: `url(${nutrition})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="fw-bold">Nutrition Planner</h2>
            <h3>
              Stay on top of your diet by planning your meals and tracking your
              calories
            </h3>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-center text-center features-padding"
            style={{
              backgroundImage: `url(${progress})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="fw-bold">Progress Reports</h2>
            <h3>
              Visualize your achievements and reach your health and fitness
              goals faster
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;