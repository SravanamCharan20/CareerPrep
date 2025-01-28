import { Code2, Globe, Layout, Terminal, Palette, Box, Zap, Shield, Settings } from 'lucide-react';

export const frontendRoadmap = {
  id: 'frontend',
  title: 'Frontend Development',
  description: 'Master modern frontend development from basics to advanced concepts',
  icon: Globe,
  nodes: {
    id: 1,
    title: 'Frontend Development',
    icon: Globe,
    level: 'Start Here',
    description: 'Begin your journey into frontend development',
    quickStart: 'Start with HTML basics and gradually move to CSS and JavaScript',
    children: [
      {
        id: 2,
        title: 'HTML & CSS Fundamentals',
        icon: Layout,
        level: 'Fundamentals',
        description: 'Learn the building blocks of web development',
        quickStart: 'Master HTML5 semantic elements and CSS box model',
        skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
        resources: [
          {
            title: 'MDN Web Docs - HTML',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
          },
          {
            title: 'CSS Tricks',
            url: 'https://css-tricks.com'
          }
        ],
        children: [
          {
            id: 3,
            title: 'Advanced CSS',
            icon: Palette,
            level: 'Intermediate',
            description: 'Master modern CSS techniques and frameworks',
            skills: ['Sass/SCSS', 'CSS Animations', 'Tailwind CSS', 'CSS Architecture'],
            resources: [
              {
                title: 'Learn Tailwind CSS',
                url: 'https://tailwindcss.com/docs'
              },
              {
                title: 'CSS Animation Guide',
                url: 'https://css-tricks.com/almanac/properties/a/animation/'
              }
            ]
          },
          {
            id: 4,
            title: 'JavaScript Essentials',
            icon: Terminal,
            level: 'Essential',
            description: 'Learn core JavaScript concepts and modern ES6+ features',
            skills: ['ES6+', 'DOM Manipulation', 'Async Programming', 'APIs'],
            resources: [
              {
                title: 'JavaScript.info',
                url: 'https://javascript.info'
              },
              {
                title: 'Eloquent JavaScript',
                url: 'https://eloquentjavascript.net'
              }
            ]
          }
        ]
      },
      {
        id: 5,
        title: 'Frontend Frameworks',
        icon: Box,
        level: 'Framework',
        description: 'Master modern frontend frameworks and libraries',
        quickStart: 'Start with React fundamentals and gradually move to advanced concepts',
        skills: ['React', 'State Management', 'Routing', 'Testing'],
        children: [
          {
            id: 6,
            title: 'React Ecosystem',
            icon: Code2,
            level: 'Advanced',
            description: 'Deep dive into the React ecosystem and advanced patterns',
            skills: [
              'Redux/Zustand',
              'React Query',
              'Next.js',
              'Testing Library',
              'Performance Optimization'
            ],
            resources: [
              {
                title: 'React Documentation',
                url: 'https://react.dev'
              },
              {
                title: 'Redux Toolkit Guide',
                url: 'https://redux-toolkit.js.org'
              }
            ]
          },
          {
            id: 7,
            title: 'Build Tools & Deployment',
            icon: Terminal,
            level: 'Advanced',
            description: 'Learn modern build tools and deployment strategies',
            skills: ['Vite', 'Webpack', 'CI/CD', 'Docker', 'Vercel/Netlify'],
            resources: [
              {
                title: 'Vite Documentation',
                url: 'https://vitejs.dev'
              },
              {
                title: 'Netlify Deployment',
                url: 'https://docs.netlify.com'
              }
            ]
          }
        ]
      },
      {
        id: 8,
        title: 'Advanced Frontend',
        icon: Code2,
        level: 'Expert',
        description: 'Master advanced frontend concepts',
        quickStart: 'Focus on performance and modern web features',
        skills: ['Web Performance', 'PWAs', 'WebAssembly', 'Micro-frontends'],
        children: [
          {
            id: 9,
            title: 'Performance Optimization',
            icon: Zap,
            level: 'Advanced',
            description: 'Optimize web application performance',
            skills: ['Code Splitting', 'Lazy Loading', 'Caching', 'Bundle Optimization'],
            resources: [
              {
                title: 'Web Performance Guide',
                url: 'https://web.dev/performance-get-started/'
              }
            ]
          },
          {
            id: 10,
            title: 'Modern Web Features',
            icon: Globe,
            level: 'Advanced',
            description: 'Implement modern web capabilities',
            skills: ['Service Workers', 'Web Workers', 'WebSocket', 'WebRTC'],
            resources: [
              {
                title: 'Modern Web Development',
                url: 'https://web.dev/learn'
              }
            ]
          }
        ]
      },
      {
        id: 11,
        title: 'Testing & Quality',
        icon: Shield,
        level: 'Professional',
        description: 'Ensure code quality and reliability',
        quickStart: 'Start with unit testing and gradually move to E2E',
        skills: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Code Quality'],
        children: [
          {
            id: 12,
            title: 'Testing Frameworks',
            icon: Code2,
            level: 'Essential',
            description: 'Master testing frameworks and methodologies',
            skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright'],
            resources: [
              {
                title: 'Testing JavaScript',
                url: 'https://testingjavascript.com/'
              }
            ]
          },
          {
            id: 13,
            title: 'Code Quality Tools',
            icon: Settings,
            level: 'Advanced',
            description: 'Implement code quality tools and practices',
            skills: ['ESLint', 'Prettier', 'TypeScript', 'Code Review'],
            resources: [
              {
                title: 'TypeScript Handbook',
                url: 'https://www.typescriptlang.org/docs/'
              }
            ]
          }
        ]
      }
    ]
  }
}; 