import React, { useState } from "react";
import { Container } from "react-bootstrap";
import LogStepsForm from "../components/Fitness/LogStepsForm";

const LogStepsPage = () => {
  const [steps, setSteps] = useState({
    date: "",
    steps: 0,
    device: "",
    day: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(steps);
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Log Steps</h2>
      <LogStepsForm
        steps={steps}
        setSteps={setSteps}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default LogStepsPage;