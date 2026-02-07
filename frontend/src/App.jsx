import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import YourNotesDetail from "./pages/YourNotesDetail.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import DeleteConfirm from "./components/DeleteConfirm.jsx";
import useSystemTheme from "./lib/theme.js";
import LogoutConfirm from "./components/LogoutConfirm.jsx";

const App = () => {
  useSystemTheme();

  return (
    <Routes>

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path="/create" element={
        <ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>
      } />

      <Route path="/note/:id" element={
        <ProtectedRoute>
          <YourNotesDetail />
        </ProtectedRoute>
      } />

      <Route path="/confirm/delete-note/:id" element={
        <ProtectedRoute>
          <DeleteConfirm />
        </ProtectedRoute>
      } />

      <Route path="/confirm/logout" element={
        <ProtectedRoute>
          <LogoutConfirm />
        </ProtectedRoute>
      } />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  );
};

export default App;
