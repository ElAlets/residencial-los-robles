import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import Announcements from "./pages/Announcements";
import Payments from "./pages/Payments";
        import Emergency from "./pages/Emergency";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/residents" element={<Residents />} />

        <Route path="/announcements" element={<Announcements />} />

        <Route path="/payments" element={<Payments />} />

        <Route path="/emergency" element={<Emergency />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;
