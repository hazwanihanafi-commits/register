import express from "express";
import cors from "cors";
import downloadRoute from "./routes/download.js";

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("ICEE 2026 Badge PDF Generator is running.");
});

// Download PDF
app.use("/download", downloadRoute);

// Render Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
