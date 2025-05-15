import { Col, Container, Pagination, Row } from "react-bootstrap";
import MealCard from "../components/Nutrition/MealCard";
import { useState } from "react";
import AddMealModal from "../components/Nutrition/AddMealModal";

const FavouriteMealPage = () => {
  const [activePage, setActivePage] = useState(1);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(number);
  }

  const [showAddDiary, setShowDiary] = useState(false);
  const handleCloseAddDiary = () => setShowDiary(false);
  const handleShowAddDiary = () => setShowDiary(true);

  return (
    <Container className="mt-5">
      <AddMealModal show={showAddDiary} handleClose={handleCloseAddDiary} />

      <h2 className="fw-bold mb-5">Your favourites meals</h2>
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
    </Container>
  );
};

export default FavouriteMealPage;
