import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import CardioList from "../components/Fitness/CardioList";
import { Plus } from "react-bootstrap-icons";
import { useState } from "react";
import LogCardioModal from "../components/Fitness/LogCardioModal";

const LogCardioPage = () => {
  const [show, setShow] = useState(false);
  const [selectedCardio, setSelectedCardio] = useState("");
  const [log, setLog] = useState({
    date: "",
    time: "",
    duration: "",
  });

  const handleItemClick = (cardio) => {
    setSelectedCardio(cardio);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cardio:", selectedCardio, log);
    setShow(false);
    setLog({ date: "", time: "", duration: "" });
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-1">
        <h2 className="fw-bold mb-0">Cardio Categories</h2>
        {/* <Button
          style={{
            backgroundColor: "#507DBC", // Blue color
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
      <CardioList onItemClick={handleItemClick} />
      <LogCardioModal
        show={show}
        onClose={() => setShow(false)}
        cardio={selectedCardio}
        log={log}
        setLog={setLog}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default LogCardioPage;
