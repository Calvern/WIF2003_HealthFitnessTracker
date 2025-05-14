import { Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import CalorieBarChart from "../components/Performance/CalorieBarChart"

import TopMoodToggle from "../components/Performance/TopMoodToggle";

const CaloriePage = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("daily");

  return (
    <Container className="py-3">
      <TopMoodToggle mode={mode} setMode={setMode} />
      <CalorieBarChart mode={mode}/>
    </Container>
  );
};

export default CaloriePage;
