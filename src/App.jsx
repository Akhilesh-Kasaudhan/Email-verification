import React, { useEffect } from "react";
import FloatingShapes from "./components/FloatingShapes";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore.js";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage .jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

//protect routes that requires authentication

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(user);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

//redirect authenticated user to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore(); //use the auth store
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShapes
        color="bg-green-500"
        size="w-64 h-64"
        style={{ top: "-10%", left: "10%" }}
        delay={0}
      />
      <FloatingShapes
        color="bg-green-500"
        size="w-48 h-48"
        style={{ top: "70%", left: "80%" }}
        delay={5}
      />
      <FloatingShapes
        color="bg-green-500"
        size="w-32 h-32"
        style={{ top: "40%", left: "-10%" }}
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
