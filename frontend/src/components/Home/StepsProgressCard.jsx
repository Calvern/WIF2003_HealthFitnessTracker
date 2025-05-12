import { Col, ProgressBar, Row } from "react-bootstrap";

const StepsProgressCard = () => {
  return (
    <div
      className="d-flex flex-column gap-4 justify-content-between w-100 p-4 rounded-4"
      style={{
        color: "white",
        backgroundColor: "#176087",
        width: "350px",
        height: "350px",
      }}
    >
      <h4 className="fw-bold mb-4 text-center">Steps count</h4>
      <h2 className="fw-bold text-center">9993 Steps</h2>
      <ProgressBar now={50} />
      <h4 className="text-center fw-bold">50% of your goal</h4>
    </div>
  );
};

export default StepsProgressCard;

