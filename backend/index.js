import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cronJob from './utils/cronJob.js'; 
import hackathonRoute from './routes/scrap.route.js';
import projectsRoute from './routes/scrap.route.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("hello world");
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/hackathons', hackathonRoute);
app.use('/api/projects', projectsRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

cronJob();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});