import { Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import CalorieBarChart from "../components/Performance/CalorieBarChart"

import TopMoodToggle from "../components/Performance/TopMoodToggle";

const CaloriePage = () => {
  const [dateIndex, setDateIndex] = useState(0);
  const [mode, setMode] = useState("daily");

  return (
    <Container className="py-3">
      <TopMoodToggle mode={mode} setMode={setMode} dateIndex={dateIndex} setDateIndex={setDateIndex}/>
      <CalorieBarChart mode={mode} dateIndex={dateIndex} />
    </Container>
  );
};

export default CaloriePage;
