import { Button, Col, Container, Row } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useGetMealById,
  useGetNutritionImage,
  useGetRecipeImage,
} from "../api/MealApi.js";
import { useEffect } from "react";

const FoodDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { mealId } = useParams();
  const { mealDetails, isLoading: mealDetailsLoading } = useGetMealById(mealId);
  const { nutritionImageUrl, isLoading: nutritionImageLoading } =
    useGetNutritionImage(mealId);
  const { recipeUrl, isLoading: recipeImageLoading } =
    useGetRecipeImage(mealId);

  if (mealDetailsLoading || nutritionImageLoading || recipeImageLoading) {
    return <div>Loading</div>;
  }
  return (
    <Container className="my-5">
      <div className="d-flex flex-row align-items-center gap-3">
        <Button
          className="border border-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={30}></ChevronLeft>
        </Button>
        <h2 className="fw-bold m-0">{mealDetails.foodName}</h2>
      </div>
      <Row className="mt-5">
        <Col className="d-flex flex-column align-items-center gap-3" md={4}>
          <img
            style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
            src={mealDetails.imageUrl}
          ></img>
          <img
            style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
            src={nutritionImageUrl}
          ></img>
        </Col>
        <Col className="d-flex justify-content-center " md={8}>
          <img
            style={{ width: "100%", maxWidth: "700px", objectFit: "cover" }}
            src={recipeUrl}
          ></img>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDetailsPage;
