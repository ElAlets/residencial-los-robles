import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div>

      <h1>Panel Residencial Los Robles</h1>

      <nav>

        <Link to="/residents">Residents</Link>
        <br />
        <Link to="/announcements">Announcements</Link>
        <br />
        <Link to="/payments">Payments</Link>

      </nav>

    </div>

  );

}

export default Dashboard;