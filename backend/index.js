import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.get('/test', (req, res) => {
    res.send("hello world");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});