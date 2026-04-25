// client/src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import Announcements from "./pages/Announcements";
import Payments from "./pages/Payments";
import Emergency from "./pages/Emergency";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

// 🔐 Protección para rutas privadas
const ProtectedLayout = () => {
  const token = localStorage.getItem("token");

  // Si no hay token, lo mandamos al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si HAY token, renderizamos el Layout (Aquí luego podrías poner tu Navbar/Sidebar)
  // El <Outlet /> es donde se inyectarán las páginas hijas (Dashboard, Residents, etc.)
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

// 👤 Protección para rutas públicas (Login)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
  // Si ya tiene token, que no vea el login, mándalo al dashboard
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* RUTAS PRIVADAS (Envueltas en el ProtectedLayout) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/emergency" element={<Emergency />} />
        </Route>

        {/* 404 NOT FOUND */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
