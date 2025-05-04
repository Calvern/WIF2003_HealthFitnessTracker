import { forwardRef, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealEntries from "../components/Nutrition/MealEntries";
import { Link } from "react-router-dom";

const FoodDiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const formRef = useRef(null);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Submit the form programmatically
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit(); // requestSubmit ensures native form submit behavior
      }
    }, 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
  };
  const CalendarButton = forwardRef(({ onClick }, ref) => (
    <Button onClick={onClick} ref={ref}>
      <Calendar size={25} />
    </Button>
  ));
  return (
    <Container className="py-5">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-center gap-5 mb-3">
          <span className="fw-bold h1 m-0" style={{ color: "#176087" }}>
            {selectedDate.toLocaleDateString()}
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            customInput={<CalendarButton />}
          />
        </div>

        {/* Hidden input for backend submission */}
        <input
          type="hidden"
          name="selectedDate"
          value={formatDate(selectedDate)}
        />
      </Form>
      <Row className="mt-5">
        <Col xs={6}></Col>
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
      <h1 className="fw-bold" style={{ color: "#176087" }}>
        Breakfast
      </h1>
      <MealEntries
        foodName="Chicken"
        calories="465"
        carbs="506"
        fat={78}
        protein={88}
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link style={{ textDecoration: "none", color: "#176087" }}>
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
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
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link style={{ textDecoration: "none", color: "#176087" }}>
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
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
      />
      <Row className="mt-2">
        <Col xs={6}>
          <Link style={{ textDecoration: "none", color: "#176087" }}>
            Add Food
          </Link>
        </Col>
        <Col xs={6}>
          <Row className="text-center">
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
            <Col xs={3} className=" ">
              <span style={{ color: "#176087" }}>465</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDiaryPage;
