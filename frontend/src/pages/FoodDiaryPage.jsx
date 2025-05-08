import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import MealEntries from "../components/Nutrition/MealEntries";
import { Link } from "react-router-dom";
import RecommendModal from "../components/Nutrition/RecommendModal";
import CalendarForm from "../components/Nutrition/CalendarForm";
import { useAppContext } from "../contexts/AppContext";
import MealSection from "../components/Nutrition/MealSection";

const FoodDiaryPage = () => {
  const dummyFoodData = {
    breakfast: [
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
    ],
    lunch: [
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
    ],
    dinner: [
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
      {
        foodName: "Chicken",
        calories: 465,
        carbs: 506,
        fat: 78,
        protein: 88,
      },
    ],
  };

  const total = Object.values(dummyFoodData)
    .flat()
    .reduce(
      (acc, food) => ({
        calories: acc.calories + Number(food.calories),
        carbs: acc.carbs + Number(food.carbs),
        fat: acc.fat + Number(food.fat),
        protein: acc.protein + Number(food.protein),
      }),
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="py-5">
      <CalendarForm />
      <Row className="mt-5">
        <Col className="d-flex align-foods-center" xs={6}>
          <Button
            className="rounded-4 px-4 py-2"
            style={{ backgroundColor: "#176087" }}
            onClick={handleShow}
          >
            Recommend
          </Button>
          <RecommendModal show={show} handleClose={handleClose} />
        </Col>
        <Col xs={6}>
          <Row>
            {["Calories", "Carbs", "Fat", "Protein"].map((label, i) => (
              <Col
                xs={3}
                key={i}
                className="border border-1 border-white py-1"
                style={{ backgroundColor: "#176087" }}
              >
                <p className="text-center text-white m-0">{label}</p>
                <p className="text-center text-white m-0">g</p>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <MealSection title="Breakfast" foodData={dummyFoodData.breakfast} />
      <MealSection title="Lunch" foodData={dummyFoodData.lunch} />
      <MealSection title="Dinner" foodData={dummyFoodData.dinner} />

      <Row className="mt-5">
        <Col className="d-flex justify-content-end align-foods-center" xs={6}>
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Total
          </h3>
        </Col>
        <Col xs={6}>
          <Row style={{ backgroundColor: "#DAE3E5" }}>
            <Col
              xs={3}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{total.calories}</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{total.carbs}</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{total.fat}</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{total.protein}</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end align-foods-center" xs={6}>
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Target
          </h3>
        </Col>
        <Col xs={6}>
          <Row>
            <Col
              xs={3}
              style={{ backgroundColor: "#DAE3E5" }}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{3000}</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end align-foods-center" xs={6}>
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Remaining
          </h3>
        </Col>
        <Col xs={6}>
          <Row>
            <Col
              xs={3}
              style={{ backgroundColor: "#DAE3E5" }}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>{3000 - total.calories}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default FoodDiaryPage;
