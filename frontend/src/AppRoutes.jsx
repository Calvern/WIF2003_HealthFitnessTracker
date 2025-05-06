import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FoodDiaryPage from "./pages/FoodDiaryPage";
import NotificationsPage from "./pages/NotificationsPage";
import RemindersPage from "./pages/RemindersPage";
import SettingsPage from "./pages/SettingsPage";
import CreateReminderPage from "./pages/CreateReminderPage";
import SearchMealPage from "./pages/SearchMealPage";
import FavouriteMealPage from "./pages/FavouriteMealPage";

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
      <Route
        path="/create-profile"
        element={
          <Layout>
            <CreateProfilePage />
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
            <div>profile</div>
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
        path="/settings"
        element={
          <Layout>
            <SettingsPage />
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
    </Routes>
  );
};

export default AppRoutes;
