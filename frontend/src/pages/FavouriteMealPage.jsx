import { Col, Container, Pagination, Row } from "react-bootstrap";
import MealCard from "../components/Nutrition/MealCard";
import { useState } from "react";
import AddMealModal from "../components/Nutrition/AddMealModal";
import { useGetFavouriteMeals } from "../api/MealApi.js";

const FavouriteMealPage = () => {
  const [showAddDiary, setShowDiary] = useState(false);
  const handleCloseAddDiary = () => setShowDiary(false);
  const handleShowAddDiary = () => setShowDiary(true);
  const [activePage, setActivePage] = useState(1);
  const { favouriteMeals, isPending } = useGetFavouriteMeals(activePage);
  console.log(favouriteMeals);
  let items = [];
  for (let number = 1; number <= favouriteMeals?.pagination.pages; number++) {
    items.push(number);
  }

  if (isPending) {
    return <div>Loading</div>;
  }

  return (
    <Container className="mt-5">
      <AddMealModal show={showAddDiary} handleClose={handleCloseAddDiary} />

      <h2 className="fw-bold mb-5">Your favourites meals</h2>
      <div className="responsive-grid">
        {favouriteMeals.data.map((meal, index) => (
          <MealCard
            key={index}
            meal={meal}
            handleShowAddDiary={handleShowAddDiary}
            isFavourite={true}
          />
        ))}
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
