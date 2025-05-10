const BMICard = () => {
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "#507DBC",
        borderRadius: "32px",
        padding: "32px",
        maxWidth: "400px",
        width: "100%"
      }}
    >
      <h4 className="fw-bold mb-2">Body Mass Index</h4>
      <h1 className="fw-bold">21.89</h1>
      <div className="d-flex justify-content-between">
        <span className="fw-bold">Height: 175cm</span>{" "}
        <span className="fw-bold">Weight: 70kg</span>
      </div>
    </div>
  );
};

export default BMICard;
