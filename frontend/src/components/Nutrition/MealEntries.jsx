import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const MealEntries = ({ foodName, calories, carbs, fat, protein }) => {
  const { showToast } = useAppContext();
  return (
    <Row
      className="border border-1 border-white"
      style={{ backgroundColor: "#DAE3E5" }}
    >
      <Col
        className="py-2 d-flex align-items-center justify-content-between"
        xs={4}
        md={6}
      >
        <span>{foodName}</span>
        <div className="d-flex flex-column flex-md-row gap-3 align-items-center">
          <Link
            className="text-center food-entry-details-link"
            to="/meal-favourites/5931"
          >
            View Details
          </Link>
          <Button
            onClick={() => showToast("Added to favourites!")}
            className="text-center food-entry-favourites-button"
          >
            Add to favourites
          </Button>

          <Button className="text-center food-entry-remove-button">
            Remove
          </Button>
        </div>
      </Col>
      <Col xs={8} md={6}>
        <Row className="h-100">
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-top-0 border-bottom-0 border-white"
          >
            <span style={{ color: "#176087" }}>{calories}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-top-0 border-bottom-0 border-white"
          >
            <span style={{ color: "#176087" }}>{carbs}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-top-0 border-bottom-0 border-white"
          >
            <span style={{ color: "#176087" }}>{fat}</span>
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center py-2 border border-1 border-top-0 border-bottom-0 border-white"
          >
            <span style={{ color: "#176087" }}>{protein}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MealEntries;
