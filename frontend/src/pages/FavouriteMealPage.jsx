import { Container, Pagination } from "react-bootstrap";
import MealCard from "../components/Nutrition/MealCard";
import { useState } from "react";

const FavouriteMealPage = () => {
  const [activePage, setActivePage] = useState(1);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(number);
  }
  return (
    <Container className="mt-5">
      <h2 className="fw-bold ">Your favourites meals</h2>
      <MealCard />
      <MealCard />
      <MealCard />
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
