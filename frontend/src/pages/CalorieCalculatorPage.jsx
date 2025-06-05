import { useState } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreatePhysicalInfo } from "../api/UsersApi";

const CalorieCalculatorPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const { createPhysicalInfo, isSuccess } = useCreatePhysicalInfo();
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const user = await createPhysicalInfo(data);
    setUser(user);
  });
  return (
    <Container className="py-5 d-flex flex-column justify-content-center align-items-center flex-fill">
      {isSuccess && (
        <Modal
          backdrop="static"
          keyboard={false}
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header>
            <Modal.Title>🎯 Daily Calorie Target</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <p className="fw-bold fs-5">
                Based on your BMI and activity level:
              </p>
              <div
                style={{
                  backgroundColor: "#A1C6EA",
                  borderRadius: "12px",
                  padding: "20px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                <h1
                  className="fw-bold "
                  style={{ fontSize: "48px", color: "#176087" }}
                >
                  {user.dailyTargetCalorie} kcal
                </h1>
                <p className="mb-0 fs-5">per day to reach your goal! 💪</p>
              </div>
              <p className="text-muted">
                You can adjust this later in your profile settings.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#507DBC", border: "none" }}
              onClick={() => {
                handleClose;
                navigate("/home");
              }}
            >
              Let's Go!
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <div
        className="border p-5 rounded-4 w-100 shadow "
        style={{ maxWidth: "450px" }}
      >
        <h1 className="fw-bold text-center mb-5">
          Help us calculate your target calorie intake
        </h1>
        <Form
          onSubmit={onSubmit}
          className="w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form.Label htmlFor="weight">Weight</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              {...register("weight", {
                required: "This field is required",
              })}
              type="number"
              min={0}
              id="weight"
            />
            <InputGroup.Text>kg</InputGroup.Text>
          </InputGroup>
          {errors.weight && (
            <div className="text-danger mb-3">{errors.weight.message}</div>
          )}

          <Form.Label htmlFor="height">Height</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              {...register("height", {
                required: "This field is required",
              })}
              type="number"
              min={0}
              max={200}
              id="height"
            />
            <InputGroup.Text>cm</InputGroup.Text>
          </InputGroup>
          {errors.height && (
            <div className="text-danger mb-3">{errors.height.message}</div>
          )}

          <Form.Label htmlFor="activity-level">Activity Level</Form.Label>
          <Form.Select
            {...register("activityLevel", {
              required: "This field is required",
            })}
            className="mb-3 shadow-none"
            id="activity-level"
          >
            <option value={1.2}>Sedentary (little/no exercise)</option>
            <option value={1.375}>Lightly Active (1-3 days/week)</option>
            <option value={1.55}>Moderately Active (3-5 days/week)</option>
            <option value={1.725}>Very Active (6-7 days/week)</option>
          </Form.Select>
          {errors.activityLevel && (
            <div className="text-danger mb-3">
              {errors.activityLevel.message}
            </div>
          )}

          <Form.Label htmlFor="weight-goal">Weight Goal</Form.Label>
          <Form.Select
            {...register("weightGoal", {
              required: "This field is required",
            })}
            className="mb-3 shadow-none"
            id="weight-goal"
          >
            <option value={-500}>Lose Weight</option>
            <option value={0}>Maintain Weight</option>
            <option value={500}>Gain Weight</option>
          </Form.Select>
          {errors.weightGoal && (
            <div className="text-danger mb-3">{errors.weightGoal.message}</div>
          )}

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
