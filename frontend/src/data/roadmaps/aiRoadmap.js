import { Brain, Code2, Database, Network, Cloud, Calculator, Cpu, Box, Zap } from 'lucide-react';

export const aiRoadmap = {
  id: 'ai',
  title: 'AI & Machine Learning',
  description: 'Explore artificial intelligence and machine learning concepts',
  icon: Brain,
  nodes: {
    id: 1,
    title: 'AI & Machine Learning',
    icon: Brain,
    level: 'Start Here',
    description: 'Begin your journey into AI and Machine Learning',
    quickStart: 'Start with Python and mathematics fundamentals',
    children: [
      {
        id: 2,
        title: 'Prerequisites',
        icon: Calculator,
        level: 'Foundation',
        description: 'Master the fundamental concepts required for AI/ML',
        quickStart: 'Focus on mathematics and programming basics',
        skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Python'],
        resources: [
          {
            title: 'Mathematics for ML',
            url: 'https://mml-book.github.io/'
          },
          {
            title: 'Python for Data Science',
            url: 'https://www.python.org/about/gettingstarted/'
          }
        ],
        children: [
          {
            id: 3,
            title: 'Data Manipulation',
            icon: Database,
            level: 'Essential',
            description: 'Learn data processing and analysis',
            skills: ['NumPy', 'Pandas', 'Data Cleaning', 'Visualization'],
            resources: [
              {
                title: 'Pandas Documentation',
                url: 'https://pandas.pydata.org/docs/'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Machine Learning',
        icon: Brain,
        level: 'Core',
        description: 'Learn fundamental ML algorithms and concepts',
        quickStart: 'Start with supervised learning algorithms',
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        children: [
          {
            id: 5,
            title: 'Supervised Learning',
            icon: Box,
            level: 'Fundamental',
            description: 'Master supervised learning algorithms',
            skills: ['Classification', 'Regression', 'Decision Trees', 'SVM'],
            resources: [
              {
                title: 'Scikit-learn Tutorials',
                url: 'https://scikit-learn.org/stable/tutorial/'
              }
            ]
          },
          {
            id: 6,
            title: 'Deep Learning',
            icon: Network,
            level: 'Advanced',
            description: 'Explore neural networks and deep learning',
            skills: ['Neural Networks', 'CNN', 'RNN', 'Transformers'],
            resources: [
              {
                title: 'Deep Learning Book',
                url: 'https://www.deeplearningbook.org/'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        title: 'Frameworks & Tools',
        icon: Code2,
        level: 'Implementation',
        description: 'Learn popular ML frameworks and tools',
        skills: ['TensorFlow', 'PyTorch', 'Keras', 'MLflow'],
        children: [
          {
            id: 8,
            title: 'Model Deployment',
            icon: Cloud,
            level: 'Production',
            description: 'Deploy ML models to production',
            skills: ['API Development', 'Docker', 'Cloud Services', 'Monitoring'],
            resources: [
              {
                title: 'MLOps Guide',
                url: 'https://ml-ops.org/'
              }
            ]
          }
        ]
      },
      {
        id: 9,
        title: 'Advanced Topics',
        icon: Cpu,
        level: 'Expert',
        description: 'Explore advanced AI/ML concepts',
        skills: ['Reinforcement Learning', 'NLP', 'Computer Vision', 'GANs'],
        children: [
          {
            id: 10,
            title: 'Optimization',
            icon: Zap,
            level: 'Advanced',
            description: 'Optimize ML models and systems',
            skills: ['Hyperparameter Tuning', 'Model Compression', 'Distributed Training'],
            resources: [
              {
                title: 'Model Optimization',
                url: 'https://www.tensorflow.org/model_optimization'
              }
            ]
          }
        ]
      }
    ]
  }
}; 