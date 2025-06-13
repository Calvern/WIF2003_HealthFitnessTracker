import React, { useState } from "react";
import TopMoodToggle from "../components/Performance/TopMoodToggle";
import BottomMoodToggle from "../components/Performance/BottomMoodToggle";
import CardioVsWorkoutChart from "../components/Performance/CardioVsWorkoutChart";
import "bootstrap/dist/css/bootstrap.min.css";

const CardiovsWorkoutPage = () => {
  const [mode, setMode] = useState("daily");
  const [type, setType] = useState("cardio");
  const [dailyIndex, setDailyIndex] = useState(0);
  const [weeklyIndex, setWeeklyIndex] = useState(0);

  const currentIndex = mode === "daily" ? dailyIndex : weeklyIndex;

  return (
    <div className="container-sm py-3">
      <TopMoodToggle
        mode={mode}
        setMode={(m) => setMode(m)}
        dateIndex={currentIndex}
        setDateIndex={(i) => {
          if (mode === "daily") setDailyIndex(i);
          else setWeeklyIndex(i);
        }}
      />

      <CardioVsWorkoutChart mode={mode} dateIndex={currentIndex} type={type} />

      <BottomMoodToggle type={type} setType={setType} />
    </div>
  );
};

export default CardiovsWorkoutPage;

