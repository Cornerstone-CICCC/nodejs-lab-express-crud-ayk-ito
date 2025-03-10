"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
// Load environment variables
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// accept JSON data and also allow the frontend to communicat
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/employees", employee_routes_1.default);
// Fallback
app.use((req, res, next) => {
    res.status(404).send("Cannot find what you are looking for :(");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
