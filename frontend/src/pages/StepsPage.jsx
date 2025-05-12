import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import StepsProgressPage from "../components/Performance/StepsProgressPage";
import DateNavigator from "../components/Performance/DateNavigator";
import { useState } from "react";
import DatePicker from "react-datepicker";
import StepBarChart from "../components/Performance/StepBarChart";

const StepsPage = () => {
  // const [date, setDate] = useState(new Date("2025-04-24"));
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());

  const weeklyData = [
    { label: "Mon", steps: 7800 },
    { label: "Tue", steps: 6200 },
    { label: "Wed", steps: 10400 },
    { label: "Thu", steps: 9700 },
    { label: "Fri", steps: 6800 },
    { label: "Sat", steps: 11500 },
    { label: "Sun", steps: 9300 },
  ];

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    label: `Day ${i + 1}`,
    steps: Math.floor(5000 + Math.random() * 7000),
  }));

  const yearlyData = [
    { label: "Jan", steps: 240000 },
    { label: "Feb", steps: 210000 },
    { label: "Mar", steps: 260000 },
    { label: "Apr", steps: 230000 },
    { label: "May", steps: 270000 },
    { label: "Jun", steps: 250000 },
    { label: "Jul", steps: 280000 },
    { label: "Aug", steps: 220000 },
    { label: "Sep", steps: 255000 },
    { label: "Oct", steps: 265000 },
    { label: "Nov", steps: 240000 },
    { label: "Dec", steps: 275000 },
  ];

  const getWeekStartEnd = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Sunday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Saturday
    return { start, end };
  };

  return (
    <Container className="py-5">
      {/* <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <DateNavigator date={date} setDate={setDate} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={20} md={16} lg={12}>
          <StepsProgressPage />
        </Col>
      </Row> */}

      <h2 className="fw-bold mb-0">Steps Performance</h2>

      <Tabs defaultActiveKey="weekly" className="m-3 mb-5 custom-tabs" justify>
        
      <Tab eventKey="weekly" title="Weekly">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2 me-3">Select Week: </label>
            <DatePicker
              selected={selectedWeek}
              onChange={(date) => setSelectedWeek(date)}
              maxDate={new Date()}
              placeholderText="Select a week"
              className="border px-3 py-1 rounded w-48"
            />
          </div>
          <StepBarChart data={weeklyData} />
        </Tab>

        <Tab eventKey="monthly" title="Monthly">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2 me-3">Select Month: </label>
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              showPopperArrow={false}
              maxDate={new Date()}
              className="border px-3 py-1 rounded w-48"
            />
          </div>
          <StepBarChart data={monthlyData} />
        </Tab>

        <Tab eventKey="yearly" title="Yearly">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2 me-3">Select Year: </label>
            <DatePicker
              selected={selectedYear}
              onChange={(date) => setSelectedYear(date)}
              dateFormat="yyyy"
              showYearPicker
              showPopperArrow={false}
              maxDate={new Date()}
              className="border px-3 py-1 rounded w-32"
            />
          </div>
          <StepBarChart data={yearlyData} />
        </Tab>
      </Tabs>

    </Container>
  );
};

export default StepsPage;
