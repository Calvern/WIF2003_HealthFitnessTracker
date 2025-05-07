import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CalorieCalculatorPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center flex-fill">
      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">
          Help us calculate your target calorie intake
        </h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Label htmlFor="weight">Weight</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="number" min={0} id="weight" />
            <InputGroup.Text>kg</InputGroup.Text>
          </InputGroup>

          <Form.Label htmlFor="height">Height</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="number" min={0} id="height" />
            <InputGroup.Text>cm</InputGroup.Text>
          </InputGroup>

          <Form.Label htmlFor="activity-level">Activity Level</Form.Label>
          <Form.Select className="mb-3 shadow-none" id="activity-level">
            <option value={1.2}>Sedentary (little/no exercise)</option>
            <option value={1.375}>Lightly Active (1-3 days/week)</option>
            <option value={1.55}>Moderately Active (3-5 days/week)</option>
            <option value={1.725}>Very Active (6-7 days/week)</option>
          </Form.Select>

          <Form.Label htmlFor="weight-goal">Weight Goal</Form.Label>
          <Form.Select className="mb-3 shadow-none" id="weight-goal">
            <option value={-300}>Lose Weight</option>
            <option value={0}>Maintain Weight</option>
            <option value={300}>Gain Weight</option>
          </Form.Select>

          <Button
            style={{ backgroundColor: "#507DBC" }}
            className="w-100 rounded-3 mt-3"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CalorieCalculatorPage;
