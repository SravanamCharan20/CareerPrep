import express from "express";
import Hackathon from "../models/hackathon.model.js";  
import Project from '../models/project.model.js';

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


router.get('/mlprojects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

export default router;