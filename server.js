const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});