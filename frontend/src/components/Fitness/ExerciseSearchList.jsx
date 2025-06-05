import { ListGroup } from "react-bootstrap";

const ExerciseSearchList = ({ onCardioClick, onWorkoutClick }) => {
  const combinedExercises = [
    { name: "Running", type: "cardio" },
    { name: "Walking", type: "cardio" },
    { name: "Jogging", type: "cardio" },
    { name: "Cycling", type: "cardio" },
    { name: "Hiking", type: "cardio" },
    { name: "Swimming", type: "cardio" },
    { name: "Push-Ups", type: "workout" },
    { name: "Pull-Ups", type: "workout" },
    { name: "Squats", type: "workout" },
    { name: "Lunges", type: "workout" },
    { name: "Deadlifts", type: "workout" },
    { name: "Bench Press", type: "workout" },
  ];

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
        {combinedExercises.map((exercise) => (
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
