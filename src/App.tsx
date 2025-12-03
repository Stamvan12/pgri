import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />; // Or unauthorized page
  }

  return <>{children}</>;
};

const RootRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role === 'GURU') {
    return <Navigate to="/teacher/dashboard" />;
  }
  
  if (user?.role === 'MURID') {
    return <Navigate to="/student/dashboard" />;
  }

  return <div>Role unknown</div>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/teacher/*" 
        element={
          <PrivateRoute role="GURU">
            <TeacherDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/*" 
        element={
          <PrivateRoute role="MURID">
            <StudentDashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<RootRedirect />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
