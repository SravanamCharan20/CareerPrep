import { Server, Database, Shield, Terminal, Network, Cloud, Code2, Package, Cpu, Lock } from 'lucide-react';

export const backendRoadmap = {
  id: 'backend',
  title: 'Backend Development',
  description: 'Learn server-side programming and API development',
  icon: Server,
  nodes: {
    id: 1,
    title: 'Backend Development',
    icon: Server,
    level: 'Start Here',
    description: 'Begin your journey into backend development',
    quickStart: 'Start with programming basics and gradually move to web servers and APIs',
    children: [
      {
        id: 2,
        title: 'Programming Fundamentals',
        icon: Code2,
        level: 'Beginner',
        description: 'Master core programming concepts',
        quickStart: 'Focus on JavaScript/Python fundamentals before moving to frameworks',
        skills: ['Data Structures', 'Algorithms', 'OOP', 'Functional Programming'],
        resources: [
          {
            title: 'JavaScript Algorithms',
            url: 'https://github.com/trekhleb/javascript-algorithms'
          },
          {
            title: 'Python Programming',
            url: 'https://docs.python.org/3/tutorial/'
          }
        ],
        children: [
          {
            id: 3,
            title: 'Version Control',
            icon: Package,
            level: 'Essential',
            description: 'Learn Git and collaboration workflows',
            skills: ['Git', 'GitHub', 'Branching', 'Pull Requests'],
            resources: [
              {
                title: 'Git Documentation',
                url: 'https://git-scm.com/doc'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Backend Frameworks',
        icon: Terminal,
        level: 'Intermediate',
        description: 'Learn server-side frameworks and APIs',
        quickStart: 'Start with Express.js for Node.js or Django for Python',
        skills: ['RESTful APIs', 'MVC Pattern', 'Middleware', 'Authentication'],
        children: [
          {
            id: 5,
            title: 'Node.js & Express',
            icon: Server,
            level: 'Framework',
            description: 'Build scalable applications with Node.js',
            skills: ['Express.js', 'Middleware', 'Error Handling', 'API Design'],
            resources: [
              {
                title: 'Node.js Documentation',
                url: 'https://nodejs.org/docs/latest/'
              },
              {
                title: 'Express.js Guide',
                url: 'https://expressjs.com/en/guide/routing.html'
              }
            ]
          },
          {
            id: 6,
            title: 'API Development',
            icon: Network,
            level: 'Essential',
            description: 'Design and implement RESTful APIs',
            skills: ['REST', 'GraphQL', 'API Security', 'Documentation'],
            resources: [
              {
                title: 'REST API Design',
                url: 'https://restfulapi.net/'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        title: 'Databases',
        icon: Database,
        level: 'Essential',
        description: 'Master database design and management',
        quickStart: 'Learn SQL basics before moving to database design',
        skills: ['Database Design', 'SQL', 'NoSQL', 'Data Modeling'],
        children: [
          {
            id: 8,
            title: 'SQL Databases',
            icon: Database,
            level: 'Fundamental',
            description: 'Learn relational databases and SQL',
            skills: ['PostgreSQL', 'MySQL', 'Joins', 'Indexing'],
            resources: [
              {
                title: 'PostgreSQL Tutorial',
                url: 'https://www.postgresqltutorial.com/'
              }
            ]
          },
          {
            id: 9,
            title: 'NoSQL Databases',
            icon: Database,
            level: 'Advanced',
            description: 'Explore non-relational databases',
            skills: ['MongoDB', 'Redis', 'Document Design', 'Scaling'],
            resources: [
              {
                title: 'MongoDB University',
                url: 'https://university.mongodb.com/'
              }
            ]
          }
        ]
      },
      {
        id: 10,
        title: 'Advanced Concepts',
        icon: Cpu,
        level: 'Advanced',
        description: 'Master advanced backend development concepts',
        skills: ['System Design', 'Scalability', 'Performance', 'Security'],
        children: [
          {
            id: 11,
            title: 'Security',
            icon: Shield,
            level: 'Critical',
            description: 'Implement robust security measures',
            skills: ['Authentication', 'Authorization', 'Encryption', 'Security Headers'],
            resources: [
              {
                title: 'OWASP Top 10',
                url: 'https://owasp.org/www-project-top-ten/'
              }
            ]
          },
          {
            id: 12,
            title: 'DevOps & Deployment',
            icon: Cloud,
            level: 'Advanced',
            description: 'Learn deployment and server management',
            skills: ['Docker', 'CI/CD', 'AWS/GCP', 'Monitoring'],
            resources: [
              {
                title: 'Docker Documentation',
                url: 'https://docs.docker.com/'
              }
            ]
          },
          {
            id: 13,
            title: 'Authentication',
            icon: Lock,
            level: 'Advanced',
            description: 'Implement secure user authentication',
            skills: ['JWT', 'OAuth', 'Sessions', 'Password Security'],
            resources: [
              {
                title: 'Auth0 Documentation',
                url: 'https://auth0.com/docs/'
              }
            ]
          }
        ]
      }
    ]
  }
}; 