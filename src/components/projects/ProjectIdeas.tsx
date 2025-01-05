import React, { useState } from 'react';
import { Search, Bookmark, BookmarkCheck, Code, GitBranch, Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Personal Assistant',
    description: 'Build a voice-controlled assistant that can handle tasks like scheduling, reminders, and web searches.',
    difficulty: 'Advanced',
    techStack: ['Python', 'TensorFlow', 'Natural Language Processing'],
    category: 'AI/ML',
    estimatedTime: '4-6 weeks',
    prerequisites: ['Basic Python', 'ML Fundamentals'],
    learningOutcomes: [
      'Understanding of NLP',
      'API Integration',
      'Voice Processing',
    ]
  },
  // Add more projects...
];

export function ProjectIdeas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedProjects, setSavedProjects] = useState<number[]>([]);

  const categories = ['All', 'Web Dev', 'Mobile', 'AI/ML', 'DevOps', 'Blockchain'];

  const filteredProjects = projects.filter(project =>
    (selectedCategory === 'all' || project.category === selectedCategory) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSaved = (projectId: number) => {
    setSavedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-4">
            Project Ideas
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-accent-600 text-white'
                      : 'bg-white dark:bg-primary-800 text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700'
                  }`}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white dark:bg-primary-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-primary-900 dark:text-white">
                    {project.title}
                  </h3>
                  <button
                    onClick={() => toggleSaved(project.id)}
                    className="text-accent-600 hover:text-accent-700 dark:text-accent-500 dark:hover:text-accent-400"
                  >
                    {savedProjects.includes(project.id) ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-primary-600 dark:text-primary-400">
                  {project.description}
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {project.techStack.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {project.estimatedTime}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="w-full px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-md transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}