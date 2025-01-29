import { motion } from 'framer-motion';
import { Bell, Moon} from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePreferences } from '../redux/user/userSlice';

export default function Settings() {
    const dispatch = useDispatch();
    const { userInteractions } = useSelector(state => state.user);
    const [preferences, setPreferences] = useState(userInteractions.preferences);

    const handleToggle = (key) => {
        const newPreferences = {
            ...preferences,
            [key]: !preferences[key]
        };
        setPreferences(newPreferences);
        dispatch(updatePreferences(newPreferences));
    };

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-gray-400">Customize your experience</p>
                </div>

                <div className="space-y-6">
                    {/* Notifications Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1c1c1e] rounded-xl p-6"
                    >
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-[#2997ff]" />
                                    <div>
                                        <p className="font-medium">Push Notifications</p>
                                        <p className="text-sm text-gray-400">Get notified about updates</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications')}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        preferences.notifications ? 'bg-[#2997ff]' : 'bg-gray-600'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                                        preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                            {/* Add more notification settings */}
                        </div>
                    </motion.div>

                    {/* Theme Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#1c1c1e] rounded-xl p-6"
                    >
                        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Moon className="w-5 h-5 text-[#2997ff]" />
                                    <div>
                                        <p className="font-medium">Dark Mode</p>
                                        <p className="text-sm text-gray-400">Toggle dark theme</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('darkMode')}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        preferences.darkMode ? 'bg-[#2997ff]' : 'bg-gray-600'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                                        preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 