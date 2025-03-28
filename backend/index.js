import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cronJob from './utils/cronJob.js'; 
import hackathonRoute from './routes/scrap.route.js';
import projectsRoute from './routes/scrap.route.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://career-prep-ten.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// middleware
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("hello world");
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/hackathons', hackathonRoute);
app.use('/api/projects', projectsRoute);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Add a mapping of topics to their URLs
const pageLinks = {
  'machine learning': '/mlprojects',
  'ml projects': '/mlprojects',
  'mern': '/mernprojects',
  'web development': '/mernprojects',
  'frontend roadmap': '/roadmaps/frontend',
  'backend roadmap': '/roadmaps/backend',
  'mobile development': '/roadmaps/mobile',
  'ai roadmap': '/roadmaps/ai',
  'certifications': '/certifications',
  'hackathons': '/hackathons',
  'career paths': '/careerpaths',
  'ai career': '/careerpaths?track=ai',
  'full stack': '/careerpaths?track=fullstack',
  'devops': '/careerpaths?track=devops',
};

// Add this new route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    // Updated context with better response formatting instructions
    const context = `You are an AI assistant for a comprehensive tech learning platform. 
    
    When responding:
    1. Keep responses concise and well-structured
    2. Use bullet points for lists
    3. Add line breaks between sections
    4. Highlight important information
    5. Always include relevant links using markdown format
    6. Limit paragraphs to 2-3 sentences
    7. Use sections when response is complex

    Example response format:
    "Let me help you with that!

    Here's what you need to know:
    • Main point 1
    • Main point 2
    
    You can find this in our [relevant section](/path).

    Additional resources:
    • [Resource 1](/path1)
    • [Resource 2](/path2)"

    Available platform features:
    1. Projects & Learning:
    • Machine Learning/AI Projects: [ML Projects](/mlprojects)
    • MERN Stack Development: [MERN Projects](/mernprojects)
    • Interactive tutorials
    • Hands-on implementations
    
    2. Career Development:
    • AI/ML Path: [AI Career](/careerpaths?track=ai)
    • Full Stack Path: [Full Stack Career](/careerpaths?track=fullstack)
    • DevOps Path: [DevOps Career](/careerpaths?track=devops)
    • [Certifications](/certifications)
    
    3. Learning Roadmaps:
    • [Frontend Development](/roadmaps/frontend)
    • [Backend Development](/roadmaps/backend)
    • [Mobile Development](/roadmaps/mobile)
    • [AI/ML Development](/roadmaps/ai)
    
    4. Additional Features:
    • [Live Hackathons](/hackathons)
    • Project Bookmarking
    • Progress Tracking
    • Community Features

    Response Guidelines:
    1. Start with a brief, friendly greeting
    2. Provide a clear, direct answer
    3. Include relevant links to platform sections
    4. Add follow-up suggestions when appropriate
    5. Keep formatting clean and consistent
    6. Use bullet points for better readability
    7. End with a helpful suggestion or call to action

    Remember to:
    • Be concise and clear
    • Structure information logically
    • Use appropriate spacing
    • Include relevant links
    • Maintain a professional tone`;

    const prompt = `${context}\n\nUser: ${message}\n\nAssistant: Provide a well-structured, professional response with relevant links.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

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