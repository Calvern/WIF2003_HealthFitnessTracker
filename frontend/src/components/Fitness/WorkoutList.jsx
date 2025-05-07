import { ListGroup } from "react-bootstrap";

const WorkoutList = () => {
  return (
    <>
      <h5 className="mt-5 fw-bold">Matching Workout</h5>
      <ListGroup as="ul">
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Push-Ups"
          action
        >
          Push-Ups
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Pull-Ups"
          action
        >
          Pull-Ups
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Squats"
          action
        >
          Squats
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Lunges"
          action
        >
          Lunges
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Deadlifts"
          action
        >
          Deadlifts
        </ListGroup.Item>
        <ListGroup.Item
          className="workout-list"
          as="li"
          eventKey="Bench Press"
          action
        >
          Bench Press
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default WorkoutList;
