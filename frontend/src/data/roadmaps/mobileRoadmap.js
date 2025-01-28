import { Smartphone, Code2, Layout, Palette, Box, Layers, Cpu, Cloud, Zap, Settings } from 'lucide-react';

export const mobileRoadmap = {
  id: 'mobile',
  title: 'Mobile Development',
  description: 'Build native and cross-platform mobile applications',
  icon: Smartphone,
  nodes: {
    id: 1,
    title: 'Mobile Development',
    icon: Smartphone,
    level: 'Start Here',
    description: 'Begin your journey into mobile app development',
    quickStart: 'Start with mobile UI/UX fundamentals before diving into development',
    children: [
      {
        id: 2,
        title: 'Mobile UI/UX Design',
        icon: Layout,
        level: 'Foundation',
        description: 'Learn mobile interface design principles',
        quickStart: 'Master platform-specific design guidelines',
        skills: ['Mobile UI Patterns', 'Responsive Design', 'Gestures', 'Navigation'],
        resources: [
          {
            title: 'Material Design',
            url: 'https://material.io/design'
          },
          {
            title: 'iOS Design Guidelines',
            url: 'https://developer.apple.com/design/'
          }
        ],
        children: [
          {
            id: 3,
            title: 'UI Components',
            icon: Box,
            level: 'Essential',
            description: 'Master mobile UI components and layouts',
            skills: ['Layouts', 'Navigation', 'Lists', 'Forms'],
            resources: [
              {
                title: 'React Native Components',
                url: 'https://reactnative.dev/docs/components-and-apis'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'React Native',
        icon: Code2,
        level: 'Framework',
        description: 'Build cross-platform mobile apps with React Native',
        quickStart: 'Start with React fundamentals before moving to mobile',
        skills: ['JavaScript/TypeScript', 'React', 'Native Modules', 'Navigation'],
        children: [
          {
            id: 5,
            title: 'Core Concepts',
            icon: Layers,
            level: 'Fundamental',
            description: 'Master React Native core concepts',
            skills: ['Components', 'Props', 'State', 'Hooks'],
            resources: [
              {
                title: 'React Native Documentation',
                url: 'https://reactnative.dev/docs/getting-started'
              }
            ]
          },
          {
            id: 6,
            title: 'Native Features',
            icon: Smartphone,
            level: 'Advanced',
            description: 'Work with device features and APIs',
            skills: ['Camera', 'Location', 'Storage', 'Push Notifications'],
            resources: [
              {
                title: 'Native Modules',
                url: 'https://reactnative.dev/docs/native-modules-intro'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        title: 'State Management',
        icon: Settings,
        level: 'Advanced',
        description: 'Handle application state and data flow',
        skills: ['Redux', 'Context API', 'MobX', 'Local Storage'],
        children: [
          {
            id: 8,
            title: 'Data Persistence',
            icon: Cloud,
            level: 'Essential',
            description: 'Manage data storage and synchronization',
            skills: ['AsyncStorage', 'SQLite', 'Realm', 'API Integration'],
            resources: [
              {
                title: 'AsyncStorage Guide',
                url: 'https://react-native-async-storage.github.io/async-storage/'
              }
            ]
          }
        ]
      },
      {
        id: 9,
        title: 'Performance',
        icon: Zap,
        level: 'Advanced',
        description: 'Optimize mobile app performance',
        skills: ['Memory Management', 'Rendering', 'Network', 'Animation'],
        children: [
          {
            id: 10,
            title: 'Testing & Deployment',
            icon: Cpu,
            level: 'Professional',
            description: 'Test and deploy mobile applications',
            skills: ['Unit Testing', 'E2E Testing', 'App Store', 'Play Store'],
            resources: [
              {
                title: 'Testing Library',
                url: 'https://callstack.github.io/react-native-testing-library/'
              }
            ]
          }
        ]
      }
    ]
  }
}; 