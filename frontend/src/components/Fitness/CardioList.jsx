import { ListGroup } from "react-bootstrap";

const CardioList = ({ onItemClick }) => {
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
      <h5 className="mt-5 fw-bold">Matching Cardio</h5>
      <ListGroup as="ul">
        {cardioWorkouts.map((cardio) => (
          <ListGroup.Item
            key={cardio}
            className="workout-list"
            as="li"
            eventKey={cardio}
            action
            onClick={() => onItemClick && onItemClick(cardio)}
          >
            {cardio}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default CardioList;