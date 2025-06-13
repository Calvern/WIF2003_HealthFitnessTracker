import { Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import CalorieBarChart from "../components/Performance/CalorieBarChart"

import TopMoodToggle from "../components/Performance/TopMoodToggle";

const CaloriePage = () => {
  const [mode, setMode] = useState("daily");
  const [dailyIndex, setDailyIndex] = useState(0);
  const [weeklyIndex, setWeeklyIndex] = useState(0);

  const currentIndex = mode === "daily" ? dailyIndex : weeklyIndex;

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };


  return (
    <Container className="py-3">
      <TopMoodToggle mode={mode} setMode={handleModeChange} dateIndex={currentIndex}
  setDateIndex={(newIndex) => {
    if (mode === "daily") setDailyIndex(newIndex);
    else setWeeklyIndex(newIndex);}}
    />
      <CalorieBarChart mode={mode} dateIndex={currentIndex} />
    </Container>
  );
};

export default CaloriePage;
