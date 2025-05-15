import React from "react";
import { Card } from "react-bootstrap";
import { GiWeightLiftingUp } from "react-icons/gi";
import { format } from "date-fns";

const ActivitiesDoneCard = () => {
  const activitiesData = [
    {
      activity: "Running",
      category: "Cardiovascular",
      dateTime: "2025-05-14T07:30:00",
    },
    {
      activity: "Push-ups",
      category: "Workout",
      dateTime: "2025-05-14T07:30:00",
    },
    {
      activity: "Cycling",
      category: "Cardiovascular",
      dateTime: "2025-05-14T07:30:00",
    },
    {
      activity: "Squats",
      category: "Workout",
      dateTime: "2025-05-14T07:30:00",
    },
    {
      activity: "Squats",
      category: "Workout",
      dateTime: "2025-05-14T07:30:00",
    },
  ];

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "1rem",
      }}
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h5 className="fw-bold mb-0">Activities Done</h5>
          <span
            style={{
              fontSize: "0.9rem",
              color: "#6c757d",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.5rem",
            }}
          >
            <GiWeightLiftingUp />
            30 done this month
          </span>
        </div>

        {/* Table Header */}
        <div
          className="d-none d-md-flex mt-4"
          style={{
            fontSize: "13px",
            color: "#6c757d",
            fontWeight: 500,
          }}
        >
          <div className="col-md-6">ACTIVITY</div>
          <div className="col-md-4">CATEGORY</div>
          <div className="col-md-2">DATE & TIME</div>
        </div>
        <hr className="d-none d-md-block" style={{ borderColor: "#e0e0e0", margin: "0.5rem 0" }} />

        {/* Table Rows */}
        {activitiesData.map((activity, index) => (
          <div
            key={index}
            className="row py-2 px-1 align-items-start align-items-md-center border-bottom"
            style={{
              borderColor: "#f1f1f1",
              margin: "0 -0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <div className="col-12 col-md-6 fw-semibold text-dark">
              {activity.activity}
            </div>

            <div className="col-12 col-md-4">
              <span
                style={{
                  color:
                    activity.category === "Workout" ? "#198754" : "#0d6efd",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {activity.category}
              </span>
            </div>

            <div
              className="col-12 col-md-2"
              style={{ color: "#6c757d" }}
            >
              {format(new Date(activity.dateTime), "dd MMM yyyy")}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default ActivitiesDoneCard;