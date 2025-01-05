import React from 'react';
import { BookOpen, Code, Database, Palette } from 'lucide-react';
import { PracticeCard } from './PracticeCard';
import { PracticeCategory } from '../../types/practice';

const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    id: 'sde',
    title: 'Software Development',
    icon: Code,
    description: 'Data structures, algorithms, and system design practice problems',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Dynamic Programming', 'System Design'],
    totalProblems: 500
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: Database,
    description: 'Statistics, machine learning, and data analysis practice problems',
    topics: ['Statistics', 'ML Algorithms', 'Data Visualization', 'Feature Engineering'],
    totalProblems: 300
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: Palette,
    description: 'Design principles, user research, and prototyping exercises',
    topics: ['Color Theory', 'Typography', 'Layout Design', 'User Research'],
    totalProblems: 200
  }
];

export function PracticeSheets() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-4">
            Practice Sheets
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            Master your skills with our comprehensive practice materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICE_CATEGORIES.map((category) => (
            <PracticeCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}