import { ListGroup } from "react-bootstrap";

const FoodList = () => {
  return (
    <>
      <h3>Matching foods</h3>
      <ListGroup as="ul">
        <ListGroup.Item className="meal-list" as="li" eventKey="chicken" action>
          Rotiserre Chicken
        </ListGroup.Item>
        <ListGroup.Item className="meal-list" as="li" eventKey="crab" action>
          Roasted Chicken
        </ListGroup.Item>
        <ListGroup.Item className="meal-list" as="li" eventKey="chicke" action>
          Stir Fried Prawns
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default FoodList;
