import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import WorkoutList from "../components/Fitness/WorkoutList";
import { Plus } from "react-bootstrap-icons";
import LogWorkoutModal from "../components/Fitness/LogWorkoutModal";
import { useState } from "react";

const LogWorkoutPage = () => {
  const [show, setShow] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [log, setLog] = useState({
    date: "",
    time: "",
    sets: "",
    reps: "",
  });

  const handleItemClick = (workout) => {
    setSelectedWorkout(workout);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workout:", selectedWorkout, log);
    setShow(false);
    setLog({ date: "", time: "", sets: "", reps: "" });
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-1">
        <h2 className="fw-bold mb-0">Workout Categories</h2>
        {/* <Button
          style={{
            backgroundColor: "#507DBC",
            border: "none",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Plus size={18} color="white" />
        </Button> */}
      </div>

      <SearchBar width="100%" />
      <WorkoutList onItemClick={handleItemClick} />
      <LogWorkoutModal
        show={show}
        onClose={() => setShow(false)}
        workout={selectedWorkout}
        log={log}
        setLog={setLog}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default LogWorkoutPage;
