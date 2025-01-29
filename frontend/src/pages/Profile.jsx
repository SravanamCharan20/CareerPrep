import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Camera } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Profile() {
    const { currentUser, userInteractions } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);

    const stats = [
        {
            label: 'Projects Completed',
            value: userInteractions.completedProjects.length
        },
        {
            label: 'Certifications',
            value: userInteractions.savedCertifications.length
        },
        {
            label: 'Days Streak',
            value: '5'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="relative mb-8">
                    {/* Cover Image */}
                    <div className="h-48 rounded-xl bg-gradient-to-r from-[#2997ff]/20 to-[#30d158]/20 mb-16">
                        <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Profile Picture */}
                    <div className="absolute left-8 bottom-0 transform translate-y-1/2">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center text-3xl font-bold">
                                {currentUser.username.charAt(0).toUpperCase()}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-[#1c1c1e] rounded-full hover:bg-[#2c2c2e] transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="absolute right-4 bottom-0 px-4 py-2 bg-[#2997ff] text-white rounded-full hover:bg-[#2997ff]/90 transition-colors flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </button>
                </div>

                {/* Profile Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - User Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1c1c1e] rounded-xl p-6"
                        >
                            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-[#2997ff]" />
                                    <div>
                                        <p className="text-sm text-gray-400">Username</p>
                                        <p className="font-medium">{currentUser.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[#2997ff]" />
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-medium">{currentUser.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[#2997ff]" />
                                    <div>
                                        <p className="text-sm text-gray-400">Joined</p>
                                        <p className="font-medium">January 2024</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {stats.map((stat) => (
                                <div 
                                    key={stat.label}
                                    className="bg-[#1c1c1e] rounded-xl p-4 text-center"
                                >
                                    <p className="text-2xl font-bold text-[#2997ff]">{stat.value}</p>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1c1c1e] rounded-xl p-6"
                    >
                        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                        <div className="space-y-4">
                            {Object.entries(userInteractions.projectProgress).map(([key, value]) => (
                                <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">{key}</span>
                                        <span className="text-[#2997ff]">{value}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-2">
                                        <div 
                                            className="bg-[#2997ff] h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 