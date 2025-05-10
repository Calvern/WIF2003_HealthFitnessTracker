import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const FitnessProgressCard = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between gap-4 border p-4 rounded-4 w-100 shadow "
      style={{ height: "350px", width: "350px" }}
    >
      <h3 className="fw-bold text-center">Fitness Progress</h3>
      <div style={{ width: "200px", height: "100px" }}>
        <CircularProgressbarWithChildren
          value={50}
          strokeWidth={15}
          circleRatio={0.5}
          styles={{
            path: {
              stroke: "#A1C6EA",
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            },
            trail: {
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            },
          }}
        >
          <p className="fw-bold" style={{ marginTop: "-20px" }}>
            45 minutes
          </p>
        </CircularProgressbarWithChildren>
      </div>

      <h4 className="text-center fw-bold mt-2">50 % of your goal</h4>
    </div>
  );
};

export default FitnessProgressCard;
