import SearchBar from "../components/Nutrition/SearchBar";
import ActivitiesDoneCard from "../components/Home/ActivitiesDoneList";
import WorkoutDetailsModal from "../components/Fitness/WorkoutDetailsModal";
import CardioDetailsModal from "../components/Fitness/CardioDetailsModal";
import ExerciseSearchList from "../components/Fitness/ExerciseSearchList";
import { useState } from "react";
import LogCardioModal from "../components/Fitness/LogCardioModal";
import LogWorkoutModal from "../components/Fitness/LogWorkoutModal";
import StepsCard from "../components/Fitness/StepsCard";
import { logExercise } from "../api/ExerciseApi";

const FitnessPage = () => {
  const [selectedCardio, setSelectedCardio] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showCardioModal, setShowCardioModal] = useState(false);

  const [cardioLog, setCardioLog] = useState({
    date: "",
    time: "",
    sets: "",
  });

  const [workoutLog, setWorkoutLog] = useState({
    date: "",
    time: "",
    sets: "",
    reps: "",
  });

  const handleCardioSubmit = async (log) => {
    console.log("Cardio Activity:", selectedCardio);
    console.log("Log:", log);
    setSelectedCardio(null);
    setCardioLog({ date: "", time: "", duration: "" }); // sets not needed for cardio

    try {
      await logExercise(log); // ✅ correct variable
      alert("Cardio logged!");
    } catch (error) {
      console.error("Failed to log cardio", error);
      alert("Error logging cardio");
    }
  };

  const handleWorkoutSubmit = async (log) => {
    console.log("Workout Activity:", selectedWorkout);
    console.log("Log:", log);
    setSelectedWorkout(null);
    setWorkoutLog({ date: "", time: "", sets: "", reps: "" });

    try {
      await logExercise(log); // ✅ correct variable
      alert("Workout logged!");
    } catch (error) {
      console.error("Failed to log workout", error);
      alert("Error logging workout");
    }
  };

  const handleActivityClick = (activity) => {
    const date = activity.date
    const time = activity.startTime;
    const commonData = { date, time };

    if (activity.type === "workout") {
      setSelectedLog({
        workout: activity.name,
        sets: activity.sets,
        reps: activity.reps,
        ...commonData,
      });
      setShowWorkoutModal(true);
    } else {
      setSelectedLog({
        cardio: activity.name,
        duration: activity.duration,
        ...commonData,
      });
      setShowCardioModal(true);
    }
  };

  const handleWorkoutDetailsSubmit = () => {
    // Save workout logic
    setShowWorkoutModal(false);
  };

  const handleCardioDetailsSubmit = () => {
    // Save cardio logic
    setShowCardioModal(false);
  };

  return (
    <div className="container px-5 py-5">
      {/* Activities at the bottom (full width) */}
      <h5 className="fw-bold mb-3">Fitness Tracker</h5>

      <div className="row">
        <div className="col-12 mb-5">
          <ActivitiesDoneCard
            onActivityClick={handleActivityClick}
            showToggle={true}
          />
          {showWorkoutModal && (
            <WorkoutDetailsModal
              show={showWorkoutModal}
              onClose={() => setShowWorkoutModal(false)}
              log={selectedLog}
              setLog={setSelectedLog}
              onSubmit={handleWorkoutDetailsSubmit}
            />
          )}
          {showCardioModal && (
            <CardioDetailsModal
              show={showCardioModal}
              onClose={() => setShowCardioModal(false)}
              log={selectedLog}
              setLog={setSelectedLog}
              onSubmit={handleCardioDetailsSubmit}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <LogCardioModal
        show={!!selectedCardio}
        cardio={selectedCardio}
        onClose={() => setSelectedCardio(null)}
        log={cardioLog}
        setLog={setCardioLog}
        onSubmit={handleCardioSubmit}
      />

      <LogWorkoutModal
        show={!!selectedWorkout}
        workout={selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
        log={workoutLog}
        setLog={setWorkoutLog}
        onSubmit={handleWorkoutSubmit}
      />

      <div className="row mt-5 mb-4">
        <div
          className="card shadow h-100 col-md-6 mb-4 mb-md-0"
          style={{ height: "350px", overflowY: "auto" }}
        >
          <StepsCard />
        </div>

        <div className="col-md-6">
          <div
            className="card shadow h-100"
            style={{ height: "350px", overflowY: "auto" }}
          >
            <div
              className="card-body"
              style={{ height: "350px", overflowY: "auto" }}
            >
              <h3 className="fw-bold my-3 text-center "> Log Exercise</h3>
              <SearchBar width="100%" />
              <ExerciseSearchList
                onCardioClick={(name) => setSelectedCardio(name)}
                onWorkoutClick={(name) => setSelectedWorkout(name)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;