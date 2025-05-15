// src/pages/HomePage.js
import { Col, Container, Row } from "react-bootstrap";
import {
  BsPersonWalking,
  BsFire,
  BsClockHistory,
  BsCupStraw,
} from "react-icons/bs";
import DashboardCard from "../components/Home/DashboardCard";
import BarChartCard from "../components/Home/BarChartCard";
import LineChartCard from "../components/Home/LineChartCard";
import ActivitiesDoneCard from "../components/Home/ActivitiesDoneList";
import UpcomingRemindersCard from "../components/Home/UpcomingRemindersCard";

const HomePage = () => {
  const handleActivityClick = (activity) => {
    console.log("Clicked activity:", activity);
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burnt",
        data: [220, 310, 280, 400, 500, 460, 490],
        backgroundColor: [
          "#176087",
          "#1E7BA6",
          "#29A0B1",
          "#37B5A0",
          "#55C89F",
          "#6EDAA3",
          "#90EE90",
        ],
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const activitiesData = [
    {
      activity: "Running",
      category: "Cardiovascular",
      minCal: "30 min / 300 cal",
      setsReps: null,
    },
    {
      activity: "Push-ups",
      category: "Workout",
      minCal: null,
      setsReps: "5 sets",
    },
    {
      activity: "Cycling",
      category: "Cardiovascular",
      minCal: "25 min / 250 cal",
      setsReps: null,
    },
    {
      activity: "Squats",
      category: "Workout",
      minCal: null,
      setsReps: "4 sets",
    },
  ];

  const reminders = [
    { title: "Project meeting", date: "2025-05-15", time: "10:00 AM" },
    { title: "Submit report", date: "2025-05-16", time: "2:00 PM" },
    { title: "Doctor's appointment", date: "2025-05-17", time: "11:30 AM" },
    { title: "Grocery shopping", date: "2025-05-18", time: "5:00 PM" },
    { title: "Gym session", date: "2025-05-19", time: "7:00 PM" },
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5 justify-content-center">
        {[
          {
            icon: <BsPersonWalking size={20} />,
            title: "Today's Steps",
            value: "281",
            percentageText: (
              <>
                <strong>+55%</strong> than average
              </>
            ),
          },
          {
            icon: <BsFire size={20} />,
            title: "Calories Burnt",
            value: "680 kcal",
            percentageText: (
              <>
                <strong>+20%</strong> from yesterday
              </>
            ),
            iconBgColor: "#dc3545",
          },
          {
            icon: <BsCupStraw size={20} />,
            title: "Calories Intake",
            value: "1,450 kcal",
            percentageText: "72% of daily goal",
            iconBgColor: "#fd7e14",
          },
          {
            icon: <BsClockHistory size={20} />,
            title: "Active Minutes",
            value: "45 min",
            percentageText: (
              <>
                <strong>+5%</strong> today
              </>
            ),
            iconBgColor: "#20c997",
          },
        ].map((card, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <DashboardCard {...card} />
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <BarChartCard
            title="Steps This Week"
            description="Track your weekly steps input."
            summaryText="Avg: 1000 steps/day"
            chartData={chartData}
            chartOptions={chartOptions}
          />
        </Col>

        <Col xs={12} md={6} lg={4}>
          <LineChartCard
            title="Calories Burnt This Week"
            description="Track your weekly energy output."
            summaryText="Avg: 380 kcal/day"
            chartData={chartData}
            chartOptions={chartOptions}
          />
        </Col>

        <Col xs={12} md={6} lg={4}>
          <LineChartCard
            title="Calories Intake This Week"
            description="Track your weekly energy input."
            summaryText="Avg: 380 kcal/day"
            chartData={chartData}
            chartOptions={chartOptions}
          />
        </Col>
      </Row>

      <Row className="mb-5 justify-content-center">
        <Col className="mt-5" xs={12} md={6} lg={7}>
          <ActivitiesDoneCard
            onActivityClick={handleActivityClick}
            showToggle={false}
          />
        </Col>
        <Col xs={12} md={6} lg={5}>
          <UpcomingRemindersCard reminders={reminders} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
