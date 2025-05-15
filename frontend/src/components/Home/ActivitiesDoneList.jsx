import React, { useState } from "react";
import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { format, isWithinInterval, subDays, parseISO } from "date-fns";

const ActivitiesDoneCard = ({ onActivityClick, showToggle = true }) => {
  const [selectedRange, setSelectedRange] = useState("7D");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "7D", label: "7D" },
    { value: "30D", label: "30D" },
    { value: "3M", label: "3M" },
    { value: "6M", label: "6M" },
  ];

  const categoryOptions = ["All", "Workout", "Cardiovascular"];

  const activitiesData = [
    {
      activity: "Running",
      category: "Cardiovascular",
      dateTime: "2025-05-14T07:30:00",
    },
    {
      activity: "Push-ups",
      category: "Workout",
      dateTime: "2025-05-10T07:30:00",
    },
    {
      activity: "Cycling",
      category: "Cardiovascular",
      dateTime: "2025-04-15T07:30:00",
    },
    {
      activity: "Squats",
      category: "Workout",
      dateTime: "2025-05-13T07:30:00",
    },
    {
      activity: "Yoga",
      category: "Workout",
      dateTime: "2025-05-12T07:30:00",
    },
    {
      activity: "Swimming",
      category: "Cardiovascular",
      dateTime: "2025-05-11T07:30:00",
    },
    {
      activity: "Walking",
      category: "Cardiovascular",
      dateTime: "2025-05-09T07:30:00",
    },
    {
      activity: "Deadlifts",
      category: "Workout",
      dateTime: "2025-05-08T07:30:00",
    },
    {
      activity: "Bench Press",
      category: "Workout",
      dateTime: "2025-05-07T07:30:00",
    },
    {
      activity: "Hiking",
      category: "Cardiovascular",
      dateTime: "2025-05-06T07:30:00",
    },
    {
      activity: "Jump Rope",
      category: "Workout",
      dateTime: "2025-05-05T07:30:00",
    },
    {
      activity: "Rowing",
      category: "Cardiovascular",
      dateTime: "2025-05-04T07:30:00",
    },
  ];

  const getFilteredActivities = () => {
    const now = new Date();
    let filtered = activitiesData;

    if (showToggle) {
      // Date range filter
      switch (selectedRange) {
        case "today":
          filtered = filtered.filter(
            (a) =>
              format(new Date(a.dateTime), "yyyy-MM-dd") ===
              format(now, "yyyy-MM-dd")
          );
          break;
        case "yesterday":
          filtered = filtered.filter(
            (a) =>
              format(new Date(a.dateTime), "yyyy-MM-dd") ===
              format(subDays(now, 1), "yyyy-MM-dd")
          );
          break;
        case "7D":
          filtered = filtered.filter((a) =>
            isWithinInterval(parseISO(a.dateTime), {
              start: subDays(now, 6),
              end: now,
            })
          );
          break;
        case "30D":
          filtered = filtered.filter((a) =>
            isWithinInterval(parseISO(a.dateTime), {
              start: subDays(now, 29),
              end: now,
            })
          );
          break;
        case "3M":
          filtered = filtered.filter((a) =>
            isWithinInterval(parseISO(a.dateTime), {
              start: subDays(now, 90),
              end: now,
            })
          );
          break;
        case "6M":
          filtered = filtered.filter((a) =>
            isWithinInterval(parseISO(a.dateTime), {
              start: subDays(now, 180),
              end: now,
            })
          );
          break;
        default:
          break;
      }

      // Category filter
      if (selectedCategory !== "All") {
        filtered = filtered.filter((a) => a.category === selectedCategory);
      }
    }

    // If no toggle shown, return only latest 8
    if (!showToggle) {
      filtered = filtered
        .sort(
          (a, b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        )
        .slice(0, 8);
    }

    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  return (
    <>
      {showToggle && (
        <div className="d-flex justify-content-between flex-wrap mb-3 align-items-center">
          {/* Date range toggle */}
          <ButtonGroup size="sm" className="flex-wrap">
            {dateRanges.map((range, idx) => (
              <ToggleButton
                key={idx}
                id={`date-radio-${idx}`}
                type="radio"
                variant="outline-secondary"
                name="range"
                value={range.value}
                checked={selectedRange === range.value}
                onChange={(e) => setSelectedRange(e.currentTarget.value)}
                className="me-1 mb-1"
                style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem" }}
              >
                {range.label}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {/* Category filter buttons */}
          <ButtonGroup size="sm" className="ms-auto">
            {categoryOptions.map((cat, idx) => (
              <ToggleButton
                key={idx}
                id={`cat-radio-${idx}`}
                type="radio"
                variant="outline-primary"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => setSelectedCategory(e.currentTarget.value)}
                className="ms-1"
                style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem" }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      )}

      {/* Activities card */}
      <Card
        className="h-100"
        style={{
          width: "100%",
          minHeight: "300px", // fixed size
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
      >
        <Card.Header style={{ backgroundColor: "transparent" }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
            <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <GrYoga />
              Activities Done
            </h5>
            <span
              style={{
                fontSize: "0.9rem",
                color: "#6c757d",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <GiWeightLiftingUp />
              {filteredActivities.length} done
            </span>
          </div>
        </Card.Header>

        <Card.Body style={{ padding: "0.2rem 1rem" }}>
          {filteredActivities.length === 0 ? (
            <div className="text-muted text-center py-3">
              No activities shown.
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div
                key={index}
                className="row py-2 px-1 align-items-start align-items-md-center border-bottom"
                style={{
                  borderColor: "#f1f1f1",
                  margin: "0 -0.5rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                onClick={() => onActivityClick(activity)}
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
                <div className="col-12 col-md-2" style={{ color: "#6c757d" }}>
                  {format(new Date(activity.dateTime), "dd MMM")}
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ActivitiesDoneCard;
