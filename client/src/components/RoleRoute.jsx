// client/src/components/RoleRoute.jsx
import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay usuario → login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si el rol NO está permitido
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;
