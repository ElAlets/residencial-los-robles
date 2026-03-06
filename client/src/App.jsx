import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import Announcements from "./pages/Announcements";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/residents" element={<Residents />} />

        <Route path="/announcements" element={<Announcements />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
