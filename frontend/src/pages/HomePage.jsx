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
import { useStepSummaryForHome } from "../hooks/useStepSummaryForHome";
import { Bullseye } from "react-bootstrap-icons";
import { fetchSteps, fetchCaloriesBurned } from "../api/ExerciseApi";
import { useQuery } from "@tanstack/react-query";
import { getUserGoals } from "../api/UsersApi";
import { useGetReminders } from "../api/ReminderApi";

const HomePage = () => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const { calorieSummary, isPending: caloriePending } =
    useGetCaloriesSummaryByDay({ date: formatDate(new Date()) });
  const { data: todaySteps, isPending: stepsPending } = useQuery({
    queryKey: ["steps"],
    queryFn: fetchSteps,
  });

  const { data: userGoals, isPending: goalsPending } = useQuery({
    queryKey: ["userGoals"],
    queryFn: getUserGoals,
  });

  const { data: caloriesBurnt, isPending: calorieBurnPending } = useQuery({
    queryKey: ["caloriesBurned"],
    queryFn: fetchCaloriesBurned,
  });

  const {
    reminders: fetchedReminders,
    isLoading: reminderLoading,
    error,
    refetch,
  } = useGetReminders(); // Fetch reminders
  const [calorieInData, setCalorieInData] = useState([]);
  const [calorieOutData, setCalorieOutData] = useState([]);
  const [avgCalIn, setAvgCalIn] = useState(0);
  const [avgCalOut, setAvgCalOut] = useState(0);
  const { inData, outData, labels, avgIn, avgOut, isLoading } =
    useWeeklyCaloriesSummary();

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

        consumed.forEach((item) => {
          const i = labelIndex(item._id.date);
          calInArr[i] += item.totalCalories;
        });

        burned.forEach((item) => {
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


  const {
    data: stepData,
    avg: avgSteps,
    isLoading: stepLoading,
  } = useStepSummaryForHome();

  const stepLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const stepChartData = {
    labels: stepLabels,
    datasets: [
      {
        label: "Steps",
        data: stepData,
        backgroundColor: stepLabels.map((_, i) => {
          const gradientColors = [
            "#176087",
            "#1E7BA6",
            "#29A0B1",
            "#37B5A0",
            "#55C89F",
            "#6EDAA3",
            "#90EE90",
          ];
          return gradientColors[i];
        }),
        borderRadius: 4,
        barThickness: 18,
      },
    ],
  };

  const stepChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString(),
          font: { size: 11 },
        },
      },
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y.toLocaleString()} steps`,
        },
      },
      legend: { display: false },
    },
  };

  if (
    (caloriePending || stepsPending || goalsPending,
    calorieBurnPending || reminderLoading)
  )
    return <div>Loading...</div>;

  if (!calorieSummary || !userGoals || caloriesBurnt == null || !todaySteps) {
    return <div>Loading summary...</div>;
  }

  return (
    <Container className="py-5">
      <Row className="mb-5 gy-5 justify-content-center">
        {[
          {
            icon: <Bullseye size={20} />,
            title: "Target Calorie",
            value: `${calorieSummary?.totalCalories - caloriesBurnt}/${
              userGoals.calories
            }`,
          },

          {
            icon: <BsFire size={20} />,
            title: "Calories Burnt",
            value: `${caloriesBurnt} kcal`,
            iconBgColor: "#dc3545",
          },
          {
            icon: <BsCupStraw size={20} />,
            title: "Calories Intake",
            value: `${calorieSummary?.totalCalories} kcal`,
            iconBgColor: "#fd7e14",
          },
          {
            icon: <BsPersonWalking size={20} />,
            title: "Today's Steps",
            value: `${todaySteps?.steps}`,
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
            summaryText={`Avg: ${avgSteps.toLocaleString()} steps/day`}
            chartData={stepChartData}
            chartOptions={stepChartOptions}
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
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y} kcal`,
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
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y} kcal`,
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
          <UpcomingRemindersCard reminders={fetchedReminders} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
