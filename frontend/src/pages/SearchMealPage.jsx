import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import FoodList from "../components/Nutrition/FoodList";
import FoodImage from "../assets/FoodImage.png";
import NutritionFacts from "../assets/NutritionFacts.png";
import RecipeInfo from "../assets/RecipeInfo.png";
import AddMealModal from "../components/Nutrition/AddMealModal";
import { useAppContext } from "../contexts/AppContext";

const SearchMeal = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const handleCloseRecipe = () => setShowRecipe(false);
  const handleShowRecipe = () => setShowRecipe(true);

  const [showAddDiary, setShowDiary] = useState(false);
  const handleCloseAddDiary = () => setShowDiary(false);
  const handleShowAddDiary = () => setShowDiary(true);

  const { showToast } = useAppContext();

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
              onClick={handleShowAddDiary}
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
            >
              Add to Diary
            </Button>
            <AddMealModal
              show={showAddDiary}
              handleClose={handleCloseAddDiary}
            />
            <Button
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
              onClick={() => showToast("Added to favourites!")}
            >
              Add to Favourites
            </Button>
          </div>
        </Col>
        <Col xs={4}>
          <div className="d-flex flex-column align-items-center gap-3">
            <Button
              onClick={handleShowRecipe}
              className="py-2 px-5 rounded-4"
              style={{ backgroundColor: "#507DBC" }}
            >
              View Recipe
            </Button>
            <Modal
              show={showRecipe}
              onHide={handleCloseRecipe}
              animation={false}
              centered
            >
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
