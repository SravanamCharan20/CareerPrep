import { Server } from 'lucide-react';

export const backendDeveloper = {
  title: "Backend Developer",
  icon: Server,
  description: "Build and maintain the server-side of web applications",
  jobRoles: [
    "API Developer",
    "Database Administrator",
    "Systems Architect",
    "Backend Engineer",
    "Cloud Engineer"
  ],
  demand: "High",
  competition: "High",
  timeTaken: "6-12 months",
  salary: "$70,000 - $160,000",
  workType: "Remote/Hybrid",
  skills: [
    "Node.js",
    "Python/Java",
    "SQL & NoSQL Databases",
    "RESTful APIs",
    "GraphQL",
    "Microservices",
    "Cloud Services (AWS/Azure)"
  ],
  tools: [
    "VS Code",
    "PyCharm",
    "Postman",
    "Docker",
    "MongoDB Compass",
    "Git",
    "Jenkins"
  ],
  communities: [
    "Stack Overflow",
    "GitHub",
    "Reddit r/backend",
    "Dev.to",
    "Node.js Community"
  ],
  roadmap: [
    {
      title: "Learn Programming Basics",
      items: ["Python", "JavaScript", "Java"]
    },
    {
      title: "Database Management",
      items: ["SQL", "MongoDB", "Redis"]
    },
    {
      title: "Backend Frameworks",
      items: ["Node.js/Express", "Django", "Spring Boot"]
    },
    {
      title: "API Development",
      items: ["REST", "GraphQL", "Authentication"]
    },
    {
      title: "DevOps Basics",
      items: ["Docker", "CI/CD", "Cloud Platforms"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      provider: "Amazon",
      difficulty: "Intermediate",
      link: "https://aws.amazon.com/certification/"
    },
    {
      name: "MongoDB Developer",
      provider: "MongoDB",
      difficulty: "Beginner",
      link: "https://university.mongodb.com/"
    }
  ],
  learningResources: [
    {
      type: "Course",
      name: "Node.js Developer Course",
      platform: "Udemy",
      link: "https://udemy.com",
      isPaid: true
    },
    {
      type: "Documentation",
      name: "Express.js Guide",
      platform: "Express",
      link: "https://expressjs.com",
      isPaid: false
    }
  ],
  projectIdeas: [
    {
      title: "RESTful API Service",
      description: "Build a complete REST API with authentication and database integration",
      difficulty: "Intermediate",
      skills: ["Node.js", "Express", "MongoDB"]
    },
    {
      title: "Real-time Chat Server",
      description: "Create a WebSocket-based chat server with user rooms",
      difficulty: "Advanced",
      skills: ["Socket.io", "Redis", "JWT"]
    }
  ],
  interviewPrep: {
    topics: [
      "Data Structures",
      "API Design",
      "Database Optimization",
      "System Design"
    ],
    resources: [
      {
        name: "System Design Primer",
        link: "https://github.com/donnemartin/system-design-primer"
      }
    ],
    commonQuestions: [
      "Explain RESTful API principles",
      "How would you handle database scaling?",
      "Describe your experience with microservices"
    ]
  },
  // eslint-disable-next-line no-dupe-keys
  salary: {
    entry: "$60,000 - $80,000",
    mid: "$80,000 - $120,000",
    senior: "$120,000 - $200,000",
    regions: {
      "US West": "Higher",
      "US East": "High",
      "Europe": "Medium",
      "Asia": "Medium-High"
    }
  }
}; 