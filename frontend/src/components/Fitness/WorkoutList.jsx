import { ListGroup } from "react-bootstrap";

const WorkoutList = ({ onItemClick }) => {
  const workouts = [
    "Push-Ups",
    "Pull-Ups",
    "Squats",
    "Lunges",
    "Deadlifts",
    "Bench Press",
  ];

  return (
    <>
      <h5 className="mt-5 fw-bold">Matching Workout</h5>
      <ListGroup as="ul">
        {workouts.map((workout) => (
          <ListGroup.Item
            key={workout}
            className="workout-list"
            as="li"
            eventKey={workout}
            action
            onClick={() => onItemClick && onItemClick(workout)}
          >
            {workout}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default WorkoutList;