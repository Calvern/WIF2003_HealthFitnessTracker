import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FoodDiaryPage from "./pages/FoodDiaryPage";
import NotificationsPage from "./pages/NotificationsPage";
import RemindersPage from "./pages/RemindersPage";
import SettingsPage from "./pages/SettingsPage";
import CreateReminderPage from "./pages/CreateReminderPage";
// import ExerciseDiaryPage from "./pages/ExerciseDiaryPage";
// import LogCardioPage from "./pages/LogCardioPage";
// import LogWorkoutPage from "./pages/LogWorkoutPage";
import SearchMealPage from "./pages/SearchMealPage";
import FavouriteMealPage from "./pages/FavouriteMealPage";
import FoodDetailsPage from "./pages/FoodDetailsPage";
import CalorieCalculatorPage from "./pages/CalorieCalculatorPage";
import ProtectedRoute from "./ProtectedRoutes";
import ShowNotificationPage from "./pages/ShowNotificationPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import DeactivateAccountPage from "./pages/DeactivateAccountPage";
import EditReminderPage from "./pages/EditReminderPage";
import StepsPage from "./pages/StepsPage";
import CaloriePage from "./pages/CaloriePage";
import CardiovsWorkoutPage from "./pages/CardiovsWorkoutPage";
import FitnessPage from "./pages/FitnessPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignInPage />
          </Layout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Layout>
            <ForgotPasswordPage />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/create-profile"
          element={
            <Layout>
              <CreateProfilePage />
            </Layout>
          }
        />

        <Route
          path="/calorie-calculator"
          element={
            <Layout>
              <CalorieCalculatorPage />
            </Layout>
          }
        />

        <Route
          path="home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="change-password"
          element={
            <Layout>
              <ChangePasswordPage />
            </Layout>
          }
        />
        <Route
          path="deactivate-account"
          element={
            <Layout>
              <DeactivateAccountPage />
            </Layout>
          }
        />
        <Route
          path="delete-account"
          element={
            <Layout>
              <DeleteAccountPage />
            </Layout>
          }
        />
        <Route
          path="food-diary"
          element={
            <Layout>
              <FoodDiaryPage />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <NotificationsPage />
            </Layout>
          }
        />
        <Route
          path="/reminders"
          element={
            <Layout>
              <RemindersPage />
            </Layout>
          }
        />
        <Route
          path="/create-reminder"
          element={
            <Layout>
              <CreateReminderPage />
            </Layout>
          }
        />
        <Route
          path="/search-meal"
          element={
            <Layout>
              <SearchMealPage />
            </Layout>
          }
        />

        <Route
          path="meal-favourites"
          element={
            <Layout>
              <FavouriteMealPage />
            </Layout>
          }
        />

        <Route
          path="meal-detail/:mealId"
          element={
            <Layout>
              <FoodDetailsPage />
            </Layout>
          }
        />
        <Route
        path="fitness"
          element={
            <Layout>
              <FitnessPage />
            </Layout>
          }
        />

        {/* <Route
          path="fitness-exercise-diary"
          element={
            <Layout>
              <ExerciseDiaryPage />
            </Layout>
          }
        />

        <Route
          path="fitness-log-workout"
          element={
            <Layout>
              <LogWorkoutPage />
            </Layout>
          }
        />
        <Route
          path="fitness-log-cardio"
          element={
            <Layout>
              <LogCardioPage />
            </Layout>
          }
        /> */}
        <Route
          path="reminders/edit-reminder/:id"
          element={
            <Layout>
              <EditReminderPage />
            </Layout>
          }
        />
        <Route
          path="notifications/show-notification/:id"
          element={
            <Layout>
              <ShowNotificationPage />
            </Layout>
          }
        />
        <Route
          path="/steps"
          element={
            <Layout>
              <StepsPage />
            </Layout>
          }
        />
        <Route
          path="/calorie-burned"
          element={
            <Layout>
              <CaloriePage />
            </Layout>
          }
        />
        <Route
          path="/cardio-vs-workout"
          element={
            <Layout>
              <CardiovsWorkoutPage />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
