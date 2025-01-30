import { motion } from 'framer-motion';
import { Award, BookMarked, Code, Target, Clock, ArrowRight, Brain, Star, Book } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

const activityIcons = {
    'completion': Award,
    'saved': BookMarked,
    'progress': Target,
    'project': Code,
    'quiz': Brain,
    'skill': Star,
    'course': Book
};

const Activity = () => {
    const { userInteractions } = useSelector(state => state.user);
    const activities = userInteractions?.activities || [];

    // Add loading state
    if (!userInteractions) {
        return (
            <div className="min-h-screen bg-black text-white pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-400">Loading activities...</p>
                    </div>
                </div>
            </div>
        );
    }

    const getActivityStyle = (type) => {
        const styles = {
            completion: {
                color: '#2997ff',
                bgColor: '#2997ff15'
            },
            saved: {
                color: '#30d158',
                bgColor: '#30d15815'
            },
            progress: {
                color: '#ff375f',
                bgColor: '#ff375f15'
            },
            project: {
                color: '#bf5af2',
                bgColor: '#bf5af215'
            },
            quiz: {
                color: '#ffd60a',
                bgColor: '#ffd60a15'
            },
            skill: {
                color: '#5e5ce6',
                bgColor: '#5e5ce615'
            },
            course: {
                color: '#ff9f0a',
                bgColor: '#ff9f0a15'
            }
        };
        return styles[type] || styles.progress;
    };

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Activity</h1>
                    <p className="text-gray-400">Your recent activities and progress</p>
                </div>

                <div className="space-y-4">
                    {activities.length === 0 ? (
                        <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">No activities yet</p>
                            <Link 
                                to="/projects"
                                className="inline-flex items-center gap-2 text-[#2997ff] hover:underline"
                            >
                                Start exploring projects
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        activities.map((activity) => {
                            const style = getActivityStyle(activity.type);
                            // Ensure each activity has a unique key by using timestamp if id is not available
                            const key = activity.id || new Date(activity.timestamp).getTime();

                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#1c1c1e] rounded-xl p-6 flex items-center gap-4"
                                >
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: style.bgColor }}
                                    >
                                        {React.createElement(activityIcons[activity.type] || Clock, {
                                            className: "w-6 h-6",
                                            style: { color: style.color }
                                        })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{activity.title}</h3>
                                        {activity.description && (
                                            <p className="text-sm text-gray-400 mt-1">
                                                {activity.description}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    {activity.link && (
                                        <Link 
                                            to={activity.link}
                                            className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                        </Link>
                                    )}
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activity; 