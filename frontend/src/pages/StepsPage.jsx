import { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import DatePicker from "react-datepicker";
import StepBarChart from "../components/Performance/StepBarChart";

const StepsPage = () => {
  const [mode, setMode] = useState("daily");
  const [dailyIndex, setDailyIndex] = useState(0);
  const [weeklyIndex, setWeeklyIndex] = useState(0);
  const [monthlyIndex, setMonthlyIndex] = useState(0);


  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-0">Steps Performance</h2>

      <Tabs defaultActiveKey="daily" className="m-3 mb-5 custom-tabs" justify>
        {/* === DAILY TAB === */}
        <Tab eventKey="daily" title="Daily">
          <div className="d-flex align-items-center gap-3 mb-4">
            <button className="btn btn-outline-primary" onClick={() => setDailyIndex(dailyIndex - 1)}>
              ◀
            </button>
            <strong className="fs-5">
              {getWeeklyLabel(dailyIndex)}
            </strong>
            <button className="btn btn-outline-primary" onClick={() => setDailyIndex(dailyIndex + 1)}>
              ▶
            </button>
          </div>
          <StepBarChart mode="daily" dateIndex={dailyIndex} />
        </Tab>

        {/* === WEEKLY TAB === */}
        <Tab eventKey="weekly" title="Weekly">
          <div className="d-flex align-items-center gap-3 mb-4">
            <button className="btn btn-outline-primary" onClick={() => setWeeklyIndex(weeklyIndex - 1)}>
              ◀
            </button>
            <strong className="fs-5">
              {getMonthYearLabel(weeklyIndex)}
            </strong>
            <button className="btn btn-outline-primary" onClick={() => setWeeklyIndex(weeklyIndex + 1)}>
              ▶
            </button>
          </div>
          <StepBarChart mode="weekly" dateIndex={weeklyIndex} />
        </Tab>

        {/* === MONTHLY TAB === */}
        <Tab eventKey="monthly" title="Monthly">
          <div className="d-flex align-items-center gap-3 mb-4">
            <button className="btn btn-outline-primary" onClick={() => setMonthlyIndex(monthlyIndex - 1)}>
              ◀
            </button>
            <strong className="fs-5">
              {getYearLabel(monthlyIndex)}
            </strong>
            <button className="btn btn-outline-primary" onClick={() => setMonthlyIndex(monthlyIndex + 1)}>
              ▶
            </button>
          </div>
          <StepBarChart mode="monthly" dateIndex={monthlyIndex} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default StepsPage;

// === Helper Functions ===

const getWeeklyLabel = (index) => {
  const today = new Date();
  const start = new Date(today);
  const offset = (start.getDay() === 0 ? -6 : 1) - start.getDay(); // get Monday
  start.setDate(start.getDate() + offset + index * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${start.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} - ${end.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`;
};

const getMonthYearLabel = (index) => {
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth() + index, 1);
  return base.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
};

const getYearLabel = (index) => {
  const today = new Date();
  const base = new Date(today.getFullYear() + index, 0, 1);
  return base.getFullYear();
};