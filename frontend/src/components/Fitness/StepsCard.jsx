import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSteps,
  fetchCardioDuration,
  fetchCaloriesBurned,
  fetchWeeklyAverages,
} from "../../api/ExerciseApi";
import { getUserGoals } from "../../api/UsersApi";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import SetTargetModal from "./SetTargetModal";
import LogStepsModal from "./LogStepsModal";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip);

const StepsCard = () => {
  const queryClient = useQueryClient();

  const { data: todaySteps, isPending, error } = useQuery({
    queryKey: ["steps"],
    queryFn: fetchSteps,
  });

  const { data: userGoals } = useQuery({
    queryKey: ["userGoals"],
    queryFn: getUserGoals,
  });

  const { data: cardioData } = useQuery({
    queryKey: ["cardioDuration"],
    queryFn: fetchCardioDuration,
  });

  const { data: caloriesData } = useQuery({
    queryKey: ["caloriesBurned"],
    queryFn: fetchCaloriesBurned,
  });

  const { data: summary = {
    averageSteps: 0,
    averageMinutes: 0,
    averageCalories: 0,
  }} = useQuery({
    queryKey: ["weeklyAverages"],
    queryFn: fetchWeeklyAverages,
  });

  const [showSetTargetModal, setShowSetTargetModal] = useState(false);
  const [showLogStepsModal, setShowLogStepsModal] = useState(false);
  const [log, setLog] = useState({ date: "", steps: 0 });
  const [selectedTab, setSelectedTab] = useState("steps");

  const steps = todaySteps?.steps ?? 0;
  const goal = userGoals?.steps ?? 1;
  const minutesGoal = userGoals?.activity ?? 1;
  const caloriesGoal = userGoals?.calories ?? 1;
  const activeMinutes = cardioData ?? 0;
  const calories = caloriesData ?? 0;

  const chartMap = {
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
  };

  const chartData = chartMap[selectedTab];

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
    queryClient.invalidateQueries(["userGoals"]);
    queryClient.invalidateQueries(["weeklyAverages"]);
  };

  const handleLogSubmit = async () => {
    const stepsLogged = parseInt(log.steps);
    if (!isNaN(stepsLogged) && stepsLogged >= 0) {
      setShowLogStepsModal(false);
      await Promise.all([
        queryClient.invalidateQueries(["steps"]),
        queryClient.invalidateQueries(["weeklyAverages"]),
        queryClient.invalidateQueries(["cardioDuration"]),
      ]);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading step data</div>;
  if (!todaySteps) return <div>No step data available</div>;

  return (
    <div className="p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Today's Progress Overview</h5>
        <ButtonGroup>
          {["steps", "minutes", "calories"].map((tab) => (
            <ToggleButton
              key={tab}
              id={`tab-${tab}`}
              type="radio"
              variant="outline-primary"
              name="progress-tab"
              className="btn-sm px-2 py-1"
              value={tab}
              checked={selectedTab === tab}
              onChange={(e) => setSelectedTab(e.currentTarget.value)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="row justify-content-center align-items-center my-4">
        <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
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
        </div>

        <div className="col-12 col-md-6 text-muted text-center">
          <div style={{ fontSize: "1.5rem" }}>Average this week:</div>
          <div style={{ fontSize: "1.8rem" }}>
            {selectedTab === "steps" && `${summary.averageSteps} steps`}
            {selectedTab === "minutes" && `${summary.averageMinutes} min`}
            {selectedTab === "calories" && `${summary.averageCalories} kcal`}
          </div>
          <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
            {["steps", "minutes"].includes(selectedTab) && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowSetTargetModal(true)}
              >
                Set Target
              </button>
            )}
            {selectedTab === "steps" && (
              <button
                className="btn btn-primary"
                onClick={() => setShowLogStepsModal(true)}
              >
                Log Steps
              </button>
            )}
          </div>
        </div>
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
        log={log}
        setLog={setLog}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default StepsCard;