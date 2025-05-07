import { Col, Row } from "react-bootstrap";
import MealEntries from "./MealEntries";
import { Link } from "react-router-dom";

const MealSection = ({ title, foodData }) => {
  const total = foodData.reduce(
    (acc, item) => ({
      calories: acc.calories + Number(item.calories),
      carbs: acc.carbs + Number(item.carbs),
      fat: acc.fat + Number(item.fat),
      protein: acc.protein + Number(item.protein),
    }),
    { calories: 0, carbs: 0, fat: 0, protein: 0 }
  );
  return (
    <>
      <h1 className="fw-bold mt-5" style={{ color: "#176087" }}>
        {title}
      </h1>
      {foodData.map((foodItem, index) => (
        <MealEntries key={index} {...foodItem} />
      ))}
      <Row className="mt-2">
        <Col xs={6}>
          <Link
            to="/search-meal"
            style={{ textDecoration: "none", color: "#176087" }}
          >
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            {["calories", "carbs", "fat", "protein"].map((key, idx) => (
              <Col xs={3} key={idx}>
                <span style={{ color: "#176087" }}>{total[key]}</span>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MealSection;
