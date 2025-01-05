import React, { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Users } from 'lucide-react';
import { ForumPost } from './ForumPost';
import { Post } from '../../types/community';

const FORUM_POSTS: Post[] = [
  {
    id: 1,
    title: 'Tips for acing technical interviews',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
    },
    category: 'Career Advice',
    content: 'Here are some tips that helped me prepare for technical interviews...',
    likes: 42,
    replies: 15,
    timestamp: '2h ago'
  },
  // Add more posts...
];

export function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Career Advice', 'Technical', 'Interview Prep', 'Job Search'];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white">
            Community Forum
          </h1>
          <button className="px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
            New Post
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
            <div className="bg-white dark:bg-primary-800 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-primary-900 dark:text-white mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedCategory === category.toLowerCase()
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-700 dark:text-white'
                        : 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-700'
                    }`}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {FORUM_POSTS.map((post) => (
                <ForumPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}