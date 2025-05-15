import { Button, Col, Row } from "react-bootstrap";
import FoodImage from "../../assets/FoodImage.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddMealModal from "./AddMealModal";

const MealCard = ({ handleShowAddDiary }) => {
  const navigate = useNavigate();
  return (
    <Row className="border-bottom border-2 py-5">
      <Col className="pb-2" md={3}>
        <img
          style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
          src={FoodImage}
        ></img>
      </Col>
      <Col md={9}>
        <div className="h-100 d-flex flex-column justify-content-between">
          <h3 className="fw-bold">Rotiserre Chicken</h3>
          <Row>
            <Col className="d-flex justify-content-center pb-2" md={4}>
              <Button
                onClick={handleShowAddDiary}
                className="w-100 py-2 px-5 rounded-4 border-0 text-center"
                style={{ backgroundColor: "#507DBC" }}
              >
                Add to Diary
              </Button>
            </Col>
            <Col className="d-flex justify-content-center  pb-2" md={4}>
              <Button
                onClick={() => navigate("/meal-favourites/5931")}
                className="w-100 py-2 px-5 rounded-4 border-0 text-center"
                style={{ backgroundColor: "#507DBC" }}
              >
                View Details
              </Button>
            </Col>
            <Col className="d-flex justify-content-center  pb-2" md={4}>
              <Button
                className="w-100 py-2 px-5 rounded-4 text-black border-0 text-center"
                style={{ backgroundColor: "#DAE3E5" }}
              >
                Remove from favourites
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default MealCard;
