import { useEffect, useState } from "react";
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
import { useGetCaloriesSummaryByDay } from "../api/FoodDiaryApi";
import { useFetchCalorieStats } from "../api/HomeStatsApi";
import { useWeeklyCaloriesSummary } from "../hooks/useWeeklyCaloriesSummary";

const HomePage = () => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const { calorieSummary, isPending: caloriePending } =
    useGetCaloriesSummaryByDay({ date: formatDate(new Date()) });

  const [calorieInData, setCalorieInData] = useState([]);
  const [calorieOutData, setCalorieOutData] = useState([]);
  const [avgCalIn, setAvgCalIn] = useState(0);
  const [avgCalOut, setAvgCalOut] = useState(0);
  const {
    inData,
    outData,
    labels,
    avgIn,
    avgOut,
    isLoading,
  } = useWeeklyCaloriesSummary();


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { consumed, burned } = await useFetchCalorieStats();

        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const labelIndex = (dateStr) => {
          const date = new Date(dateStr);
          return date.getDay() === 0 ? 6 : date.getDay() - 1;
        };

        const calInArr = Array(7).fill(0);
        const calOutArr = Array(7).fill(0);

        consumed.forEach(item => {
          const i = labelIndex(item._id.date);
          calInArr[i] += item.totalCalories;
        });

        burned.forEach(item => {
          const i = labelIndex(item._id.date);
          calOutArr[i] += item.totalCaloriesOut;
        });

        setCalorieInData(calInArr);
        setCalorieOutData(calOutArr);
        setAvgCalIn(Math.round(calInArr.reduce((a, b) => a + b, 0) / 7));
        setAvgCalOut(Math.round(calOutArr.reduce((a, b) => a + b, 0) / 7));
      } catch (err) {
        console.error("Error loading calorie stats", err);
      }
    };

    fetchStats();
  }, []);

  const reminders = [
    { title: "Project meeting", date: "2025-05-15", time: "10:00 AM" },
    { title: "Submit report", date: "2025-05-16", time: "2:00 PM" },
    { title: "Doctor's appointment", date: "2025-05-17", time: "11:30 AM" },
    { title: "Grocery shopping", date: "2025-05-18", time: "5:00 PM" },
    { title: "Gym session", date: "2025-05-19", time: "7:00 PM" },
  ];

  const ChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [2200, 3100, 2800, 4000, 5000, 4600, 4900],
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

  const Options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1000 },
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (caloriePending) return <div>Loading...</div>;

  return (
    <Container className="py-5">
      <Row className="mb-5 gy-5 justify-content-center">
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
            value: `${avgCalOut} kcal`,
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
            value: `${calorieSummary.totalCalories} kcal`,
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

      <Row className="mb-5 gy-5 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <BarChartCard
            title="Steps This Week"
            description="Track your weekly steps input."
            summaryText="Avg: 3,700 steps/day"
            chartData={ChartData}
            chartOptions={Options}
          />
        </Col>

        <Col xs={12} md={6} lg={4}>
        <LineChartCard
          title="Calories Burnt This Week"
          description="Track your weekly energy output."
          summaryText={`Avg: ${avgOut} kcal/day`}
          chartData={{
            labels,
            datasets: [
              {
                label: "Calories Out",
                data: outData,
                borderColor: "#E98580",
                backgroundColor: "#E9858055",
                fill: true,
                tension: 0,
              },
            ],
          }}
          chartOptions={{
            responsive: true,
            scales: {
              y: { beginAtZero: true},
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => `${ctx.parsed.y} kcal`,
                },
              },
            },
          }}
        />
      </Col>

      <Col xs={12} md={6} lg={4}>
        <LineChartCard
          title="Calories Intake This Week"
          description="Track your weekly energy input."
          summaryText={`Avg: ${avgIn} kcal/day`}
          chartData={{
            labels,
            datasets: [
              {
                label: "Calories In",
                data: inData,
                borderColor: "#80B5E9",
                backgroundColor: "#80B5E955",
                fill: true,
                tension: 0,
              },
            ],
          }}
          chartOptions={{
            responsive: true,
            scales: {
              y: { beginAtZero: true},
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => `${ctx.parsed.y} kcal`,
                },
              },
            },
          }}
        />
      </Col>
      </Row>

      <Row className="mb-5 justify-content-center">
        <Col className="mt-5" xs={12} md={6} lg={7}>
          <ActivitiesDoneCard />
        </Col>
        <Col xs={12} md={6} lg={5}>
          <UpcomingRemindersCard reminders={reminders} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;