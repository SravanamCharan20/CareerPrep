import { motion } from 'framer-motion';
import { Bell, Award, Code, BookMarked, Check, Trash } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead, clearNotifications } from '../redux/user/userSlice';
import { formatDistanceToNow } from 'date-fns';

const notificationIcons = {
    'achievement': Award,
    'project': Code,
    'saved': BookMarked,
    'system': Bell
};

export default function Notifications() {
    const dispatch = useDispatch();
    const { userInteractions } = useSelector(state => state.user);
    const notifications = userInteractions?.notifications || [];
    const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

    const handleMarkAsRead = (id) => {
        dispatch(markNotificationAsRead(id));
    };

    const handleClearAll = () => {
        dispatch(clearNotifications());
    };

    const getNotificationIcon = (type) => {
        return notificationIcons[type] || Bell;
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'achievement':
                return '#2997ff';
            case 'project':
                return '#30d158';
            case 'saved':
                return '#ff375f';
            default:
                return '#bf5af2';
        }
    };

    if (!userInteractions) {
        return (
            <div className="min-h-screen bg-black text-white pt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-400">Loading notifications...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                        <p className="text-gray-400">
                            {unreadCount 
                                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                                : 'No new notifications'
                            }
                        </p>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Trash className="w-4 h-4" />
                            <span>Clear all</span>
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
                            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400">No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map((notification) => {
                            const Icon = getNotificationIcon(notification.type);
                            const color = getNotificationColor(notification.type);

                            return (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-[#1c1c1e] rounded-xl p-6 flex items-start gap-4 relative group ${
                                        !notification.read ? 'border-l-4 border-[#2997ff]' : ''
                                    }`}
                                >
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${color}15` }}
                                    >
                                        <Icon 
                                            className="w-6 h-6"
                                            style={{ color }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{notification.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            className="p-2 hover:bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all absolute top-4 right-4"
                                            title="Mark as read"
                                        >
                                            <Check className="w-5 h-5 text-[#2997ff]" />
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
} 