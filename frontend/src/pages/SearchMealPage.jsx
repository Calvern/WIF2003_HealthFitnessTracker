import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Pagination,
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
import MealCard from "../components/Nutrition/MealCard";

const SearchMeal = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const handleCloseRecipe = () => setShowRecipe(false);
  const handleShowRecipe = () => setShowRecipe(true);

  const [showAddDiary, setShowDiary] = useState(false);
  const handleCloseAddDiary = () => setShowDiary(false);
  const handleShowAddDiary = () => setShowDiary(true);

  const { showToast } = useAppContext();

  const [activePage, setActivePage] = useState(1);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(number);
  }

  return (
    <Container className="py-5">
      <AddMealModal show={showAddDiary} handleClose={handleCloseAddDiary} />
      <h2 className="fw-bold">Search for your desired meals</h2>
      <SearchBar width="100"/>
      <h2 className="fw-bold mt-5">Matching Results</h2>
      <div className="responsive-grid">
        <MealCard handleShowAddDiary={handleShowAddDiary} isFavourite={true} />
        <MealCard handleShowAddDiary={handleShowAddDiary} isFavourite={false} />
        <MealCard handleShowAddDiary={handleShowAddDiary} isFavourite={true} />
        <MealCard handleShowAddDiary={handleShowAddDiary} isFavourite={false} />
        <MealCard handleShowAddDiary={handleShowAddDiary} isFavourite={true} />
      </div>
      <div className="w-100 d-flex justify-content-center">
        <Pagination className="mt-3">
          {items.map((pageNumber) => (
            <Pagination.Item
              linkClassName="text-black"
              key={pageNumber}
              active={pageNumber === activePage}
              onClick={() => setActivePage(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      {/*<Col xs={12} md={4}>
          <FoodList />
        </Col>
        <Col xs={12} md={4}>
          <div className="d-flex flex-column align-items-center gap-5">
            <h3 className="fw-bold">Rotiserre Chicken</h3>
            <img
              style={{ width: "100%", maxWidth: "400px", objectFit: "cover" }}
              src={FoodImage}
            />
            <Button
              onClick={handleShowAddDiary}
              className="py-2 px-5 rounded-4 border-0 w-75 text-center"
              style={{ backgroundColor: "#507DBC" }}
            >
              Add to Diary
            </Button>
            <AddMealModal
              show={showAddDiary}
              handleClose={handleCloseAddDiary}
            />
            <Button
              className="py-2 px-5 rounded-4 border-0 w-75 text-center"
              style={{ backgroundColor: "#507DBC" }}
              onClick={() => showToast("Added to favourites!")}
            >
              Add to Favourites
            </Button>
            <Button
              onClick={handleShowRecipe}
              className="py-2 px-5 rounded-4 border-0 w-75 text-center"
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
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="d-flex flex-column align-items-center gap-3">
            <img
              style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
              src={NutritionFacts}
            />
          </div>
        </Col>
      </Row>*/}
    </Container>
  );
};

export default SearchMeal;
