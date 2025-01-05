import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const companies = [
  {
    id: 'google',
    name: 'Google',
    roles: [
      {
        title: 'Software Engineer',
        questions: [
          { id: 1, title: 'Implement LRU Cache', difficulty: 'Hard', topics: ['Data Structures'] },
          { id: 2, title: 'Design Google Drive', difficulty: 'Hard', topics: ['System Design'] },
        ]
      },
      {
        title: 'ML Engineer',
        questions: [
          { id: 3, title: 'Implement PageRank', difficulty: 'Medium', topics: ['Algorithms'] },
        ]
      }
    ]
  },
  // Add more companies...
];

export function CompanyQuestions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.roles.some(role =>
      role.questions.some(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-4">
            Previous Company Questions
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
            <input
              type="text"
              placeholder="Search companies or questions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="bg-white dark:bg-primary-800 rounded-lg shadow-sm"
            >
              <button
                className="w-full px-4 py-3 flex items-center justify-between text-left"
                onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
              >
                <span className="text-lg font-medium text-primary-900 dark:text-white">
                  {company.name}
                </span>
                {expandedCompany === company.id ? (
                  <ChevronUp className="h-5 w-5 text-primary-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary-500" />
                )}
              </button>

              {expandedCompany === company.id && (
                <div className="px-4 pb-4">
                  {company.roles.map(role => (
                    <div key={role.title} className="mt-4">
                      <button
                        className="w-full flex items-center justify-between text-left text-primary-700 dark:text-primary-300"
                        onClick={() => setExpandedRole(expandedRole === role.title ? null : role.title)}
                      >
                        <span>{role.title}</span>
                        {expandedRole === role.title ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {expandedRole === role.title && (
                        <div className="mt-2 space-y-2">
                          {role.questions.map(question => (
                            <div
                              key={question.id}
                              className="p-3 bg-primary-50 dark:bg-primary-700 rounded-md"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-primary-900 dark:text-white font-medium">
                                    {question.title}
                                  </h4>
                                  <div className="mt-1 flex items-center space-x-2">
                                    <span className={`text-sm px-2 py-1 rounded ${
                                      question.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                      {question.difficulty}
                                    </span>
                                    {question.topics.map(topic => (
                                      <span
                                        key={topic}
                                        className="text-sm text-primary-600 dark:text-primary-400"
                                      >
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <button className="p-2 text-accent-600 hover:text-accent-700 dark:text-accent-500 dark:hover:text-accent-400">
                                  <BookOpen className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}