require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bankRoutes = require("./routes/bankRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Bank API running on port ${process.env.PORT}`);
});
