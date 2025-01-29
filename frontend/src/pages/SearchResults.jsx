import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, Brain, Code, Award, Trophy, Map, Briefcase, Cpu, Globe, Server } from 'lucide-react';
import { useEffect } from 'react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Define searchable content with categories and keywords
  const searchableContent = [
    {
      title: 'Machine Learning Projects',
      description: 'Build AI and ML projects with Python',
      category: 'projects',
      keywords: ['ml', 'machine learning', 'ai', 'python', 'data science', 'artificial intelligence', 'deep learning', 'neural networks', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'jupyter', 'data analysis', 'computer vision', 'nlp', 'natural language processing'],
      path: '/mlprojects',
      icon: Brain,
      color: '#2997ff'
    },
    {
      title: 'MERN Stack Projects',
      description: 'Full-stack web development projects',
      category: 'projects',
      keywords: ['mern', 'web', 'react', 'node', 'mongodb', 'javascript', 'express', 'frontend', 'backend', 'full stack', 'web development', 'js', 'jsx', 'api', 'rest', 'database', 'nosql', 'responsive', 'typescript', 'tailwind', 'css', 'html'],
      path: '/mernprojects',
      icon: Code,
      color: '#30d158'
    },
    {
      title: 'Frontend Development Roadmap',
      description: 'Complete guide to becoming a frontend developer',
      category: 'roadmaps',
      keywords: ['frontend', 'web', 'react', 'vue', 'angular', 'javascript', 'html', 'css', 'responsive design', 'ui', 'ux', 'web design', 'frontend roadmap', 'career path', 'web development', 'frontend engineer', 'react developer'],
      path: '/roadmaps/frontend',
      icon: Globe,
      color: '#2997ff'
    },
    {
      title: 'Backend Development Roadmap',
      description: 'Master backend development and system architecture',
      category: 'roadmaps',
      keywords: ['backend', 'server', 'api', 'database', 'node.js', 'python', 'java', 'golang', 'backend roadmap', 'system design', 'microservices', 'devops', 'cloud', 'aws', 'docker', 'kubernetes', 'backend engineer'],
      path: '/roadmaps/backend',
      icon: Server,
      color: '#30d158'
    },
    {
      title: 'Mobile Development Roadmap',
      description: 'Learn mobile app development from scratch',
      category: 'roadmaps',
      keywords: ['mobile', 'android', 'ios', 'react native', 'flutter', 'swift', 'kotlin', 'mobile development', 'app development', 'cross platform', 'mobile apps', 'mobile engineer', 'app developer'],
      path: '/roadmaps/mobile',
      icon: Globe,
      color: '#ff375f'
    },
    {
      title: 'AI/ML Career Path',
      description: 'Career guide for AI and Machine Learning',
      category: 'careerpaths',
      keywords: ['ai', 'ml', 'machine learning', 'data science', 'artificial intelligence', 'data scientist', 'ml engineer', 'ai engineer', 'career', 'job', 'salary', 'skills', 'interview', 'machine learning engineer', 'ai researcher'],
      path: '/careerpaths?track=ai',
      icon: Brain,
      color: '#2997ff'
    },
    {
      title: 'Full Stack Developer Path',
      description: 'Become a full stack developer',
      category: 'careerpaths',
      keywords: ['full stack', 'web development', 'frontend', 'backend', 'developer', 'engineer', 'career', 'job', 'salary', 'skills', 'interview', 'full stack developer', 'software engineer', 'web developer'],
      path: '/careerpaths?track=fullstack',
      icon: Code,
      color: '#30d158'
    },
    {
      title: 'Machine Learning Certification',
      description: 'Get certified in Machine Learning and AI',
      category: 'certifications',
      keywords: ['ml', 'machine learning', 'ai', 'certification', 'python', 'data science', 'certificate', 'course', 'learning', 'study', 'exam', 'tensorflow', 'pytorch', 'deep learning', 'neural networks'],
      path: '/certifications?category=ml',
      icon: Award,
      color: '#ff375f'
    },
    {
      title: 'Web Development Certification',
      description: 'Full-stack web development certifications',
      category: 'certifications',
      keywords: ['web', 'mern', 'react', 'node', 'certification', 'javascript', 'frontend', 'backend', 'full stack', 'certificate', 'course', 'learning', 'study', 'exam', 'web developer'],
      path: '/certifications?category=web',
      icon: Award,
      color: '#ff375f'
    },
    {
      title: 'ML/AI Hackathons',
      description: 'Participate in AI and ML hackathons',
      category: 'hackathons',
      keywords: ['ml', 'ai', 'hackathon', 'competition', 'machine learning', 'coding challenge', 'contest', 'team', 'project', 'artificial intelligence', 'data science', 'programming contest', 'coding competition'],
      path: '/hackathons?category=ml',
      icon: Trophy,
      color: '#2997ff'
    },
    {
      title: 'Web Development Hackathons',
      description: 'Join web development competitions',
      category: 'hackathons',
      keywords: ['web', 'hackathon', 'competition', 'frontend', 'backend', 'full stack', 'coding challenge', 'contest', 'team', 'project', 'web development', 'programming contest', 'coding competition'],
      path: '/hackathons?category=web',
      icon: Trophy,
      color: '#30d158'
    },
    {
      title: 'DevOps Career Path',
      description: 'Start your career in DevOps and Cloud',
      category: 'careerpaths',
      keywords: ['devops', 'cloud', 'aws', 'azure', 'docker', 'kubernetes', 'ci/cd', 'automation', 'infrastructure', 'deployment', 'operations', 'system admin', 'cloud engineer', 'devops engineer'],
      path: '/careerpaths?track=devops',
      icon: Cpu,
      color: '#ff375f'
    }
  ];

  // Search logic
  const results = searchableContent.filter(item => {
    const searchTerms = query.split(' ');
    return searchTerms.every(term =>
      item.keywords.some(keyword => keyword.includes(term)) ||
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
  });

  // Auto-navigate if there's an exact match
  useEffect(() => {
    if (results.length === 1) {
      const exactMatch = results[0];
      const isExactKeywordMatch = exactMatch.keywords.some(keyword => 
        query.split(' ').every(term => keyword.includes(term))
      );
      
      if (isExactKeywordMatch) {
        navigate(exactMatch.path);
      }
    }
  }, [query, results, navigate]);

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Search className="w-6 h-6 text-[#2997ff]" />
          <h1 className="text-2xl font-bold">
            Search results for "{query}"
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No results found for "{query}"
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {results.map((result, index) => (
              <Link
                key={index}
                to={result.path}
                className="bg-[#1c1c1e] rounded-xl p-6 hover:bg-[#2997ff]/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${result.color}15` }}
                  >
                    <result.icon className="w-6 h-6" style={{ color: result.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
                    </div>
                    <p className="text-gray-400">{result.description}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400">
                        {result.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 