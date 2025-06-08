import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
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
  const {
    data: todaySteps,
    isPending,
    error,
  } = useQuery({
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

  const [showSetTargetModal, setShowSetTargetModal] = useState(false);
  const [showLogStepsModal, setShowLogStepsModal] = useState(false);
  const [log, setLog] = useState({ date: "", steps: 0 });
  const [goal, setGoal] = useState(0);
  const [steps, setSteps] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [minutesGoal, setMinutesGoal] = useState(0);
  const [calories, setCalories] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [summary, setSummary] = useState({
    averageSteps: 0,
    averageMinutes: 0,
    averageCalories: 0,
  });
  const [selectedTab, setSelectedTab] = useState("steps");

  useEffect(() => {
    const loadSummary = async () => {
      const data = await fetchWeeklyAverages();
      setSummary(data);
    };

    if (
      todaySteps &&
      userGoals &&
      typeof cardioData !== "undefined" &&
      typeof caloriesData !== "undefined"
    ) {
      setSteps(todaySteps.steps || 0);
      setGoal(userGoals.steps);
      setMinutesGoal(userGoals.activity);
      setCaloriesGoal(userGoals.calories);
      setActiveMinutes(cardioData);
      setCalories(caloriesData);

      loadSummary();
    }
  }, [todaySteps, userGoals, cardioData, caloriesData]);

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

  const chartData = chartMap[selectedTab] || chartMap["steps"];

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
    const stepsLogged = parseInt(log.steps);
    if (!isNaN(stepsLogged) && stepsLogged >= 0) {
      setSteps(stepsLogged);
      setShowLogStepsModal(false);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading step data</div>;
  if (!todaySteps) return <div>No step data available</div>;

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
            {selectedTab === "steps" && (
              <>
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
              </>
            )}

            {selectedTab === "minutes" && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowSetTargetModal(true)}
              >
                Set Target
              </button>
            )}
            {/* No buttons for calories tab */}
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
