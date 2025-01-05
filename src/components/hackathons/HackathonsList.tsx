import React, { useState } from 'react';
import { Search, Calendar, Trophy, Users } from 'lucide-react';
import { HackathonCard } from './HackathonCard';
import { Hackathon } from '../../types/hackathon';

const HACKATHONS_DATA: Hackathon[] = [
  {
    id: 1,
    title: 'Global Tech Hackathon 2024',
    organizer: 'TechCommunity',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    mode: 'Virtual',
    prizePool: '$10,000',
    participants: 500,
    description: 'Join the biggest virtual hackathon of 2024!',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  // Add more hackathons...
];

export function HackathonsList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-4">
            Upcoming Hackathons
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            Compete, learn, and win prizes in exciting hackathons from around the world
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
            <input
              type="text"
              placeholder="Search hackathons..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHONS_DATA.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    </div>
  );
}