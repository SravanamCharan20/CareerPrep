import express from "express";
import Hackathon from "../models/hackathon.model.js";  
const router = express.Router();

router.get("/fetch-hackathons", async (req, res) => {
    try {
        const hackathons = await Hackathon.find({});
        res.json(hackathons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;