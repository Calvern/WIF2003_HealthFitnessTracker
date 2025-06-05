import { ListGroup } from "react-bootstrap";

const ExrciseList = ({ onItemClick }) => {
  const cardioWorkouts = [
    "Running",
    "Walking",
    "Jogging",
    "Cycling",
    "Hiking",
    "Swimming",
    
  ];

  return (
    <>
      <h5 className="mt-5 fw-bold">Matching Searches</h5>
      <ListGroup as="ul">
        {cardioWorkouts.map((exercise) => (
          <ListGroup.Item
            key={exercise}
            className="workout-list"
            as="li"
            eventKey={exercise}
            action
            onClick={() => onItemClick && onItemClick(exercise)}
          >
            {exercise}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ExrciseList;