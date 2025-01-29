import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    ChevronDown, 
    Settings, 
    BarChart2,
    Clock,
    LogOut,
    Trophy,
    Star
} from 'lucide-react';
import PropTypes from 'prop-types';

export const ProfileDropdown = ({ currentUser, onSignOut }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            title: 'Dashboard',
            icon: BarChart2,
            path: '/dashboard',
            color: '#2997ff',
            description: 'View your progress and stats'
        },
        {
            title: 'Profile',
            icon: User,
            path: '/profile',
            color: '#30d158',
            description: 'Manage your account settings'
        },
        {
            title: 'Activity',
            icon: Clock,
            path: '/activity',
            color: '#ff375f',
            description: 'See your recent actions'
        },
        {
            title: 'Settings',
            icon: Settings,
            path: '/settings',
            color: '#bf5af2',
            description: 'Customize your experience'
        }
    ];

    const stats = [
        {
            label: 'Projects',
            value: '12',
            icon: Star,
            color: '#2997ff'
        },
        {
            label: 'Hackathons',
            value: '3',
            icon: Trophy,
            color: '#30d158'
        }
    ];

    return (
        <div className="relative">
            <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center">
                    <span className="text-white font-semibold">
                        {currentUser.username.charAt(0).toUpperCase()}
                    </span>
                </div>
                <span className="text-gray-400">{currentUser.username}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-[#1c1c1e] rounded-xl border border-white/10 shadow-xl z-50"
                        >
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center">
                                        <span className="text-white text-lg font-semibold">
                                            {currentUser.username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{currentUser.username}</h3>
                                        <p className="text-sm text-gray-400">{currentUser.email}</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="p-3 rounded-lg bg-white/5">
                                            <div className="flex items-center gap-2">
                                                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                                                <span className="text-sm text-gray-400">{stat.label}</span>
                                            </div>
                                            <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 mx-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <div 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: `${item.color}15` }}
                                        >
                                            <item.icon 
                                                className="w-5 h-5"
                                                style={{ color: item.color }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="p-2 border-t border-white/10">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        onSignOut();
                                    }}
                                    className="flex items-center gap-3 mx-2 p-2 rounded-lg hover:bg-white/5 transition-colors group w-full"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                        <LogOut className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-red-500">Sign Out</p>
                                        <p className="text-xs text-gray-500">End your current session</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

ProfileDropdown.propTypes = {
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onSignOut: PropTypes.func.isRequired
}; 