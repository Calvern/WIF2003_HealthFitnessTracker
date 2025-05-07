import { Card, ListGroup } from "react-bootstrap";

const CardioList = () => {
  return (
    <>
      <h5 className="mt-5 fw-bold">Matching Cardio</h5>
      <ListGroup as="ul">
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Push-Ups"
          action
        >
          Running
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Pull-Ups"
          action
        >
          Walking
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Squats"
          action
        >
          Jogging
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Lunges"
          action
        >
          Cycling
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Deadlifts"
          action
        >
          Hiking
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Bench Press"
          action
        >
          Swimming
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default CardioList;
