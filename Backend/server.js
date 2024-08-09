import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import jobRoutes from"./src/routes/jobRoutes.js"
import { errorMiddleware } from "./src/middleware/errorMiddleware.js";

dotenv.config();
connectDb();

const app = express();

// Use express.json() middleware correctly
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.send("First node js");
});

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);


app.use(errorMiddleware)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
