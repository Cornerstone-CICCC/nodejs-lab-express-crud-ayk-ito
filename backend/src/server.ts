import express, { NextFunction, Request, Response } from "express"; // Import express
import cors from "cors";
import dotenv from "dotenv";
import employeeRouter from "./routes/employee.routes";

// Load environment variables
dotenv.config();
// Create server
const app = express();

// accept JSON data and also allow the frontend to communicat
app.use(express.json());
app.use(cors());

// Routes
app.use("/employees", employeeRouter);

// Fallback
app.use((req, res, next) => {
  res.status(404).send("Cannot find what you are looking for :(");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
