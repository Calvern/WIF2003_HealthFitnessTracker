import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import RecommendModal from "../components/Nutrition/RecommendModal";
import CalendarForm from "../components/Nutrition/CalendarForm";
import MealSection from "../components/Nutrition/MealSection";
import { useGetDiaryByDate, useRecommendMeals } from "../api/FoodDiaryApi";
import { useQuery } from "@tanstack/react-query";
import { fetchCaloriesBurned } from "../api/ExerciseApi";
import { getUserGoals } from "../api/UsersApi";

const FoodDiaryPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };
  const { recommendMeal, isPending: isRecommending } = useRecommendMeals();
  const submitRecommendation = async (targetCalorie) => {
    const formData = {
      targetCalorie,
      date: formatDate(selectedDate),
    };
    await recommendMeal(formData);
    handleClose();
  };

  const { foodDiary, isPending: isGetting } = useGetDiaryByDate(
    formatDate(selectedDate)
  );

  const { data: caloriesBurnt, isPending: calorieBurnPending } = useQuery({
    queryKey: ["caloriesBurned"],
    queryFn: fetchCaloriesBurned,
  });

  const { data: userGoals, isPending: goalsPending } = useQuery({
    queryKey: ["userGoals"],
    queryFn: getUserGoals,
  });
  if (isGetting || calorieBurnPending || goalsPending) {
    return <div>Loading</div>;
  }

  const breakfast = foodDiary.meals.filter(
    (meal) => meal.mealType === "breakfast"
  );
  const lunch = foodDiary.meals.filter((meal) => meal.mealType === "lunch");
  const dinner = foodDiary.meals.filter((meal) => meal.mealType === "dinner");

  const total = foodDiary?.meals?.reduce(
    (acc, meal) => ({
      calories: acc.calories + Number(meal.calories || 0),
      protein: acc.protein + Number(meal.protein || 0),
      fat: acc.fat + Number(meal.fat || 0),
      carbs: acc.carbs + Number(meal.carbs || 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  return (
    <Container className="py-5">
      <CalendarForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Row className="mt-5">
        <Col className="d-flex align-foods-center" xs={4} md={6}>
          <Button
            className="rounded-4 px-4 py-2 border border-0"
            style={{ backgroundColor: "#176087" }}
            onClick={handleShow}
          >
            Recommend
          </Button>
          <RecommendModal
            show={show}
            handleClose={handleClose}
            submitRecommendation={submitRecommendation}
            isPending={isRecommending}
          />
        </Col>
        <Col xs={8} md={6}>
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

      <MealSection
        title="Breakfast"
        foodData={breakfast}
        selectedDate={formatDate(selectedDate)}
      />
      <MealSection
        title="Lunch"
        foodData={lunch}
        selectedDate={formatDate(selectedDate)}
      />
      <MealSection
        title="Dinner"
        foodData={dinner}
        selectedDate={formatDate(selectedDate)}
      />

      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end align-foods-center"
          xs={4}
          md={6}
        >
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Total
          </h3>
        </Col>
        <Col xs={8} md={6}>
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
        <Col
          className="d-flex justify-content-end align-foods-center"
          xs={4}
          md={6}
        >
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Target
          </h3>
        </Col>
        <Col xs={8} md={6}>
          <Row>
            <Col
              xs={3}
              style={{ backgroundColor: "#DAE3E5" }}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>
                {userGoals.calories + caloriesBurnt}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col
          className="d-flex justify-content-end align-foods-center"
          xs={4}
          md={6}
        >
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Remaining
          </h3>
        </Col>
        <Col xs={8} md={6}>
          <Row>
            <Col
              xs={3}
              style={{ backgroundColor: "#DAE3E5" }}
              className="d-flex align-foods-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>
                {userGoals.calories + caloriesBurnt - total.calories}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default FoodDiaryPage;
