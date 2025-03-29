import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Camera, Code, Brain, Award, Book } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signOutFailure } from '../redux/userSlice';

const Profile = () => {
    const { currentUser, userInteractions } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!userInteractions) {
        return (
            <div className="min-h-screen bg-black text-white pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                        <div className="w-12 h-12 border-4 border-t-[#2997ff] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-400">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Initialize required data with defaults
    const completedProjects = userInteractions?.completedProjects || [];
    const savedCertifications = userInteractions?.savedCertifications || [];
    const projectProgress = userInteractions?.projectProgress || {};
    const roadmapProgress = userInteractions?.roadmapProgress || {};

    const learningStats = [
        {
            label: 'Projects',
            value: completedProjects.length,
            icon: Code,
            color: '#2997ff'
        },
        {
            label: 'Certifications',
            value: savedCertifications.length,
            icon: Award,
            color: '#30d158'
        },
        {
            label: 'Learning Hours',
            value: Math.round(userInteractions?.stats?.totalTimeSpent / 60) || 0,
            icon: Book,
            color: '#ff375f'
        },
        {
            label: 'Skills Unlocked',
            value: userInteractions?.unlockedSkills?.length || 0,
            icon: Brain,
            color: '#bf5af2'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            console.log('User updated successfully');
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            navigate('/signin');
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            dispatch(signOutSuccess(data));
            navigate('/signin');
        } catch (error) {
            dispatch(signOutFailure(error.message));
        }
    };

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

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - User Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Information */}
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
                                        <p className="text-sm text-gray-400">Member Since</p>
                                        <p className="font-medium">
                                            {new Date(currentUser.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Learning Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                        >
                            {learningStats.map((stat) => (
                                <div 
                                    key={stat.label}
                                    className="bg-[#1c1c1e] rounded-xl p-4"
                                >
                                    <div 
                                        className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                                        style={{ backgroundColor: `${stat.color}15` }}
                                    >
                                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>
                                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
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
                        className="space-y-6"
                    >
                        {/* Roadmap Progress */}
                        <div className="bg-[#1c1c1e] rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Learning Paths</h2>
                            <div className="space-y-4">
                                {Object.entries(roadmapProgress).map(([key, data]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400 capitalize">{key}</span>
                                            <span className="text-[#2997ff]">{data.progress}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2">
                                            <div 
                                                className="bg-[#2997ff] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${data.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Project Progress */}
                        <div className="bg-[#1c1c1e] rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
                            <div className="space-y-4">
                                {Object.entries(projectProgress).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">{key}</span>
                                            <span className="text-[#30d158]">{value}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2">
                                            <div 
                                                className="bg-[#30d158] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 