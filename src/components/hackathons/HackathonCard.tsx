import React from 'react';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { Hackathon } from '../../types/hackathon';

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-sm overflow-hidden">
      <img
        src={hackathon.image}
        alt={hackathon.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
          {hackathon.title}
        </h3>
        <p className="text-primary-600 dark:text-primary-400 mb-4">
          {hackathon.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-primary-500 dark:text-primary-400">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-primary-500 dark:text-primary-400">
            <MapPin className="h-4 w-4 mr-2" />
            {hackathon.mode}
          </div>
          <div className="flex items-center text-sm text-primary-500 dark:text-primary-400">
            <Trophy className="h-4 w-4 mr-2" />
            Prize Pool: {hackathon.prizePool}
          </div>
          <div className="flex items-center text-sm text-primary-500 dark:text-primary-400">
            <Users className="h-4 w-4 mr-2" />
            {hackathon.participants} Participants
          </div>
        </div>

        <button className="w-full px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
          Register Now
        </button>
      </div>
    </div>
  );
}