import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useDeleteMealFromFavourite } from "../../api/MealApi";

const MealCard = ({ meal, handleShowAddDiary, isFavourite = false }) => {
  const navigate = useNavigate();
  const { deleteMealFromFavourite, isPending } = useDeleteMealFromFavourite();
  return (
    <Card style={{ width: "100%" }}>
      <Card.Img
        onClick={() => navigate(`/meal-detail/${meal.mealId}`)}
        style={{ cursor: "pointer" }}
        variant="top"
        className="object-fit-cover"
        src={meal.imageUrl}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center fw-bold">
          {meal.foodName}
          {isFavourite ? (
            <HeartFill
              onClick={() => deleteMealFromFavourite(meal.mealId)}
              color="red"
            />
          ) : (
            <Heart />
          )}
        </Card.Title>
        <div className="d-flex justify-content-center mt-4">
          <Button
            onClick={handleShowAddDiary}
            className="py-2 px-5 rounded-4 border-0 text-center"
            style={{ backgroundColor: "#507DBC" }}
          >
            Add to Diary
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MealCard;
