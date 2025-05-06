import { Button, Col, Container, Row } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import RecipeInfo from "../assets/RecipeInfo.png";
import FoodImage from "../assets/FoodImage.png";
import NutritionFacts from "../assets/NutritionFacts.png";

const FoodDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="my-5">
      <div className="d-flex flex-row align-items-center gap-3">
        <Button
          className="border border-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => navigate("/meal-favourites")}
        >
          <ChevronLeft size={30}></ChevronLeft>
        </Button>
        <h2 className="fw-bold m-0">Rotiserre Chicken</h2>
      </div>
      <Row className="mt-5">
        <Col className="d-flex flex-column align-items-center gap-3" md={4}>
          <img
            style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
            src={FoodImage}
          ></img>
          <img
            style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
            src={NutritionFacts}
          ></img>
        </Col>
        <Col className="d-flex justify-content-center " md={8}>
          <img
            style={{ width: "100%", maxWidth: "700px", objectFit: "cover" }}
            src={RecipeInfo}
          ></img>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDetailsPage;
