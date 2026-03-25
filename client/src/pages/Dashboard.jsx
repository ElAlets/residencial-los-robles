import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div>

      <h1>Panel de Administración</h1>

      <div>
        <h3>Opciones</h3>

        <ul>
          <li><Link to="/residents">Ver residentes</Link></li>
          <li><Link to="/announcements">Ver anuncios</Link></li>
          <li><Link to="/payments">Registrar pagos</Link></li>
          <li><Link to="/emergency">Servicios de emergencia</Link></li>
        </ul>

      </div>

    </div>
  );

}

export default Dashboard;