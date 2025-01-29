import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Award, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserProgress } from '../hooks/useUserProgress';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
    const { userInteractions, userProgress } = useSelector(state => state.user);
    const { calculateStreak } = useUserProgress();

    // Add loading state
    if (!userInteractions || !userProgress) {
        return (
            <div className="min-h-screen bg-black text-white pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                        <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-400">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: 'Overall Progress',
            value: `${Math.round(
                Object.values(userInteractions?.projectProgress || {}).reduce((acc, curr) => acc + curr, 0) / 
                Math.max(Object.keys(userInteractions?.projectProgress || {}).length, 1)
            )}%`,
            icon: TrendingUp,
            color: '#2997ff'
        },
        {
            title: 'Completed Projects',
            value: userInteractions?.completedProjects?.length || 0,
            icon: Award,
            color: '#30d158'
        },
        {
            title: 'Learning Streak',
            value: `${calculateStreak() || 0} days`,
            icon: Calendar,
            color: '#ff375f'
        },
        {
            title: 'Time Spent',
            value: `${Math.round((userInteractions?.stats?.totalTimeSpent || 0) / 60)}h`,
            icon: Clock,
            color: '#bf5af2'
        }
    ];

    const recentProjects = Object.entries(userInteractions?.projectProgress || {})
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-400">Track your progress and achievements</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#1c1c1e] rounded-xl p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${stat.color}15` }}
                                >
                                    <stat.icon 
                                        className="w-6 h-6"
                                        style={{ color: stat.color }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">{stat.title}</p>
                                    <p className="text-2xl font-semibold">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Progress Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#1c1c1e] rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Recent Projects</h2>
                            <Link 
                                to="/projects"
                                className="text-[#2997ff] text-sm hover:underline flex items-center gap-1"
                            >
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentProjects.length === 0 ? (
                                <p className="text-gray-400 text-center py-4">No projects started yet</p>
                            ) : (
                                recentProjects.map(([projectId, progress]) => (
                                    <div key={projectId}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">{projectId}</span>
                                            <span className="text-[#2997ff]">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2">
                                            <div 
                                                className="bg-[#2997ff] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-[#1c1c1e] rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Recent Activity</h2>
                            <Link 
                                to="/activity"
                                className="text-[#2997ff] text-sm hover:underline flex items-center gap-1"
                            >
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {userInteractions?.activities?.length === 0 ? (
                                <p className="text-gray-400 text-center py-4">No recent activity</p>
                            ) : (
                                (userInteractions?.activities || []).slice(0, 5).map((activity, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                                    >
                                        <Award className="w-5 h-5 text-[#2997ff]" />
                                        <div>
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-gray-400">
                                                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 