import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import SearchBar from "../components/Nutrition/SearchBar";
import CardioList from "../components/Fitness/CardioList";
import { Plus } from "react-bootstrap-icons";


const LogCardioPage = () => {
  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-1">
        <h2 className="fw-bold mb-0">Cardio Categories</h2>
        <Button
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
        </Button>
      </div>
      <SearchBar width="100%" />
      <CardioList />
    </Container>
  );
};

export default LogCardioPage;
