import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import SetTargetModal from "./SetTargetModal";
import LogStepsModal from "./LogStepsModal";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip);

const StepsCard = () => {
  const [showSetTargetModal, setShowSetTargetModal] = useState(false);
  const [showLogStepsModal, setShowLogStepsModal] = useState(false);

  const [goal, setGoal] = useState(10000);
  const [steps, setSteps] = useState(6421);
  const [activeMinutes, setActiveMinutes] = useState(34);
  const [minutesGoal, setMinutesGoal] = useState(60);
  const [calories, setCalories] = useState(390);
  const [caloriesGoal, setCaloriesGoal] = useState(500);

  const [selectedTab, setSelectedTab] = useState("steps");

  const chartData = {
    steps: {
      value: steps,
      goal: goal,
      color: "#507DBC",
      label: "steps",
    },
    minutes: {
      value: activeMinutes,
      goal: minutesGoal,
      color: "#58A27C",
      label: "min",
    },
    calories: {
      value: calories,
      goal: caloriesGoal,
      color: "#F4A259",
      label: "kcal",
    },
  }[selectedTab];

  const doughnutData = {
    labels: ["Progress", "Remaining"],
    datasets: [
      {
        data: [chartData.value, Math.max(chartData.goal - chartData.value, 0)],
        backgroundColor: [chartData.color, "#eaeaea"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
  };

  const handleTargetSave = (target) => {
    setGoal(Number(target.steps));
    setMinutesGoal(Number(target.workoutMinutes));
    setCaloriesGoal(Number(target.calories));
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const stepsLogged = parseInt(log.sets);
    if (!isNaN(stepsLogged) && stepsLogged >= 0) {
      setSteps(stepsLogged);
      setShowLogStepsModal(false);
    }
  };

  return (
    <div className="p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Progress Overview</h5>
        <ButtonGroup>
          {[
            { label: "Steps", value: "steps" },
            { label: "Minutes", value: "minutes" },
            { label: "Calories", value: "calories" },
          ].map((tab) => (
            <ToggleButton
              key={tab.value}
              id={`tab-${tab.value}`}
              type="radio"
              variant="outline-primary"
              name="progress-tab"
              className="btn-sm px-2 py-1"
              value={tab.value}
              checked={selectedTab === tab.value}
              onChange={(e) => setSelectedTab(e.currentTarget.value)}
            >
              {tab.label}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

<div className="d-flex justify-content-center align-items-center gap-4 my-4">
  <div style={{ position: "relative", height: 200, width: 200 }}>
    <Doughnut data={doughnutData} options={chartOptions} />
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h5 className="mb-0" style={{ color: chartData.color }}>
        {chartData.value}
      </h5>
      <small className="text-muted">
        / {chartData.goal} {chartData.label}
      </small>
    </div>
  </div>

  <div className="text-muted ms-5 text-center">
    <div style={{ fontSize: "1.5rem" }}>Average this week:</div>
    <div style={{ fontSize: "1.8rem" }}>
      <strong>{Math.round(chartData.goal * 0.72)}</strong> {chartData.label}
    </div>
     <div className="mt-3 d-flex justify-content-between">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowSetTargetModal(true)}
        >
          Set Target
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowLogStepsModal(true)}
        >
          Log Steps
        </button>
      </div>

  </div>
</div>


      {/* <div className="mt-5 d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowSetTargetModal(true)}
        >
          Set Target
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowLogStepsModal(true)}
        >
          Log Steps
        </button>
      </div> */}

      <hr className="mt-4 mb-2" style={{ color: "#6c757d" }}></hr>

      {/* Filters (just placeholder text/button for now) */}
      <div className="text-end mt-3">
        <button className="btn btn-link p-0 text-decoration-none text-primary">
          Filters
        </button>
      </div>

      {/* Modals */}
      <SetTargetModal
        show={showSetTargetModal}
        onClose={() => setShowSetTargetModal(false)}
        onSave={handleTargetSave}
      />

      <LogStepsModal
        show={showLogStepsModal}
        onClose={() => setShowLogStepsModal(false)}
        steps={steps}
        log={{ sets: steps }}
        setLog={({ sets }) => setSteps(sets)}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default StepsCard;
