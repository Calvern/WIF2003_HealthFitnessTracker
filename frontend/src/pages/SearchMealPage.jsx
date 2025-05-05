import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import FoodList from "../components/Nutrition/FoodList";
import FoodImage from "../assets/FoodImage.png";
import NutritionFacts from "../assets/NutritionFacts.png";
import RecipeInfo from "../assets/RecipeInfo.png";

const SearchMeal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="py-5">
      <h2 className="fw-bold">Search for your desired meals</h2>
      <SearchBar />
      <Row className="mt-5">
        <Col xs={4}>
          <FoodList />
        </Col>
        <Col xs={4}>
          <div className="d-flex flex-column align-items-center gap-5">
            <h3 className="fw-bold">Rotiserre Chicken</h3>
            <img
              style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
              src={FoodImage}
            />
            <Button
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
            >
              Add to Diary
            </Button>
            <Button
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
            >
              Add to Favourites
            </Button>
          </div>
        </Col>
        <Col xs={4}>
          <div className="d-flex flex-column align-items-center gap-3">
            <Button
              onClick={handleShow}
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
            >
              View Recipe
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} centered>
              <img src={RecipeInfo} />
            </Modal>
            <img
              style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
              src={NutritionFacts}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMeal;
