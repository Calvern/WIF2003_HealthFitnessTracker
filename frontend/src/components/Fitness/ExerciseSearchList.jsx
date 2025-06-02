import { ListGroup } from "react-bootstrap";
import exerciseList from "../../data/exerciseList";

const ExerciseSearchList = ({ onCardioClick, onWorkoutClick }) => {
  const handleClick = (exercise) => {
    if (exercise.type === "cardio") {
      onCardioClick?.(exercise.name);
    } else if (exercise.type === "workout") {
      onWorkoutClick?.(exercise.name);
    }
  };

  return (
    <>
      <h5 className="mt-3 fw-bold">Matching Results</h5>
      <ListGroup as="ul">
        {exerciseList.map((exercise) => (
          <ListGroup.Item
            key={exercise.name}
            className="workout-list"
            as="li"
            eventKey={exercise.name}
            action
            onClick={() => handleClick(exercise)}
          >
            {exercise.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ExerciseSearchList;