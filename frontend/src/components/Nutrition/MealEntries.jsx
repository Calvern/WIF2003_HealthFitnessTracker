import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MealEntries = ({ foodName, calories, carbs, fat, protein }) => {
  return (
    <Row style={{ backgroundColor: "#DAE3E5" }}>
      <Col
        className="py-2 d-flex align-items-center justify-content-between"
        xs={6}
      >
        <span>{foodName}</span>
        <div className="d-flex gap-3">
          <Link className="food-entry-details-link" to="/meal-favourites/5931">
            View Details
          </Link>
          <Button className="food-entry-favourites-button">
            Add to favourites
          </Button>

          <Button className="food-entry-remove-button">Remove</Button>
        </div>
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
