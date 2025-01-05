import React from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { Post } from '../../types/community';

interface ForumPostProps {
  post: Post;
}

export function ForumPost({ post }: ForumPostProps) {
  return (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-sm p-6">
      <div className="flex items-start space-x-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-primary-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-primary-500 dark:text-primary-400">
                Posted by {post.author.name} · {post.timestamp}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-700 dark:text-primary-200">
              {post.category}
            </span>
          </div>

          <p className="mt-2 text-primary-600 dark:text-primary-400">
            {post.content}
          </p>

          <div className="mt-4 flex items-center space-x-4">
            <button className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {post.likes}
            </button>
            <button className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.replies} replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}