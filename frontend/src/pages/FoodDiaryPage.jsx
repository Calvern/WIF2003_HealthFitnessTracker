import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import MealEntries from "../components/Nutrition/MealEntries";
import { Link } from "react-router-dom";
import RecommendModal from "../components/Nutrition/RecommendModal";
import CalendarForm from "../components/Nutrition/CalendarForm";
import { useAppContext } from "../contexts/AppContext";

const FoodDiaryPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { showToast } = useAppContext();

  return (
    <Container className="py-5">
      <CalendarForm />
      <Row className="mt-5">
        <Col className="d-flex align-items-center" xs={6}>
          <Button
            className="rounded-4 px-4 py-2"
            style={{ backgroundColor: "#176087" }}
            onClick={handleShow}
          >
            Recommend
          </Button>
          <RecommendModal show={show} handleClose={handleClose} />
        </Col>
        <Col xs={6}>
          <Row>
            <Col
              xs={3}
              className="border border-1 border-white"
              style={{ backgroundColor: "#176087" }}
            >
              <p className="text-center text-white m-0">Calories</p>
              <p className="text-center text-white m-0  ">kCal</p>
            </Col>
            <Col
              xs={3}
              className="border border-1 border-white"
              style={{ backgroundColor: "#176087" }}
            >
              <p className="text-center text-white m-0">Carbs</p>
              <p className="text-center text-white m-0  ">g</p>
            </Col>
            <Col
              xs={3}
              className="border border-1 border-white"
              style={{ backgroundColor: "#176087" }}
            >
              <p className="text-center text-white m-0">Fat</p>
              <p className="text-center text-white m-0  ">g</p>
            </Col>
            <Col
              xs={3}
              className="border border-1 border-white"
              style={{ backgroundColor: "#176087" }}
            >
              <p className="text-center text-white m-0">Protein</p>
              <p className="text-center text-white m-0  ">g</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <h1 className="mt-4 fw-bold" style={{ color: "#176087" }}>
        Breakfast
      </h1>
      <MealEntries
        foodName="Chicken"
        calories="465"
        carbs="506"
        fat={78}
        protein={88}
        onFavouriteClick={() => showToast("Added to favourites!")}
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link
            to="/search-meal"
            style={{ textDecoration: "none", color: "#176087" }}
          >
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <h1 className="fw-bold mt-5" style={{ color: "#176087" }}>
        Lunch
      </h1>

      <MealEntries
        foodName="Chicken"
        calories="465"
        carbs="506"
        fat={78}
        protein={88}
        onFavouriteClick={() => showToast("Added to favourites!")}
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link style={{ textDecoration: "none", color: "#176087" }}>
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <h1 className="fw-bold mt-5" style={{ color: "#176087" }}>
        Dinner
      </h1>

      <MealEntries
        foodName="Chicken"
        calories="465"
        carbs="506"
        fat={78}
        protein={88}
        onFavouriteClick={() => showToast("Added to favourites!")}
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link style={{ textDecoration: "none", color: "#176087" }}>
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3}>
              <span style={{ color: "#176087" }}>465</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="d-flex justify-content-end align-items-center" xs={6}>
          <h3 className="m-0 fw-bold" style={{ color: "#176087" }}>
            Total
          </h3>
        </Col>
        <Col xs={6}>
          <Row style={{ backgroundColor: "#DAE3E5" }}>
            <Col
              xs={3}
              className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>9999</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>9999</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>9999</span>
            </Col>
            <Col
              xs={3}
              className="d-flex align-items-center justify-content-center py-2 border border-1 border-white"
            >
              <span style={{ color: "#176087" }}>9999</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDiaryPage;
