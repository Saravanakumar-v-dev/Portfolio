import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

function RouteFallback() {
  return <div className="min-h-screen bg-transparent" />;
}

export default function App() {
  return (
    <div className="min-h-screen text-theme-primary transition-colors duration-200">
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
