const express = require("express");
const cors = require("cors");
require("dotenv").config();

const announcementRoutes = require("./routes/announcementRoutes");

app.use("/api/announcements", announcementRoutes);

const authRoutes = require("./routes/authRoutes");
const residentRoutes = require("./routes/residentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "API Residencial Los Robles funcionando"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/api/emergency", emergencyRoutes);