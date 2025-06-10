import { useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import AddMealModal from "../components/Nutrition/AddMealModal";
import { useAppContext } from "../contexts/AppContext";
import MealCard from "../components/Nutrition/MealCard";
import { useSearchMeal } from "../api/MealApi.js";

const SearchMeal = () => {
  const [showAddDiary, setShowDiary] = useState(false);
  const handleCloseAddDiary = () => setShowDiary(false);
  const handleShowAddDiary = () => setShowDiary(true);

  const [searchParams, setSearchParams] = useState({
    query: "",
    page: 1,
  });

  const setQuery = (formData) => {
    setSearchParams((prevState) => ({
      ...prevState,
      query: formData.query,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchParams((prevState) => ({
      ...prevState,
      query: "",
      page: 1,
    }));
  };

  const setPageNumber = (page) => {
    setSearchParams((prevState) => ({
      ...prevState,
      page: page,
    }));
  };
  const { searchResults, isPending } = useSearchMeal(searchParams);
  let items = [];
  for (let number = 1; number <= searchResults?.pagination.pages; number++) {
    items.push(number);
  }
  if (isPending) {
    return <div>Loading</div>;
  }
  return (
    <Container className="py-5">
      <AddMealModal show={showAddDiary} handleClose={handleCloseAddDiary} />
      <h2 className="fw-bold">Search for your desired meals</h2>
      <SearchBar
        width="100"
        query={searchParams.query}
        setQuery={setQuery}
        resetSearch={resetSearch}
      />
      <h2 className="fw-bold mt-5">Matching Results</h2>
      {searchResults.data.length === 0 ? (
        <h3 className="mt-5 fw-medium">No Results Found</h3>
      ) : (
        <div className="responsive-grid">
          {searchResults.data.map((meal, index) => (
            <MealCard
              key={index}
              meal={meal}
              handleShowAddDiary={handleShowAddDiary}
            />
          ))}
        </div>
      )}

      <div className="w-100 d-flex justify-content-center">
        <Pagination className="mt-3">
          {items.map((pageNumber) => (
            <Pagination.Item
              linkClassName="text-black"
              key={pageNumber}
              active={pageNumber === searchParams.page}
              onClick={() => setPageNumber(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
};

export default SearchMeal;
