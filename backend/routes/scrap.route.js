import express from "express";
import Hackathon from "../models/hackathon.model.js";  
import Project from '../models/mlproject.model.js';
import mernprojectModel from "../models/mernproject.model.js";

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

router.get('/mernprojects', async (req, res) => {
    try {
      const projects = await mernprojectModel.find();
      res.json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

export default router;