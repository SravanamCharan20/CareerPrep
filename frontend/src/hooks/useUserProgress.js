import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLastVisited, updateRoadmapProgress, updateUserStats, addActivity, addNotification, updateProjectProgress } from '../redux/user/userSlice';
import { useLocation } from 'react-router-dom';

export const useUserProgress = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { currentUser, userProgress, userInteractions } = useSelector((state) => state.user);

    // Track last visited page
    useEffect(() => {
        if (currentUser) {
            dispatch(setLastVisited({
                path: location.pathname,
                timestamp: new Date().toISOString()
            }));
        }
    }, [location.pathname, currentUser, dispatch]);

    const updateProgress = (projectId, progress) => {
        dispatch(updateProjectProgress({ projectId, progress }));
    };

    const logActivity = (activity) => {
        dispatch(addActivity(activity));
    };

    const sendNotification = (notification) => {
        dispatch(addNotification(notification));
    };

    const updateStats = (stats) => {
        dispatch(updateUserStats(stats));
    };

    const calculateStreak = () => {
        // Implement streak calculation logic
        const today = new Date();
        let streak = 0;
        // ... streak calculation based on activities
        return streak;
    };

    const getProgress = (roadmapId) => {
        return userProgress?.roadmapProgress?.[roadmapId] || 0;
    };

    return {
        updateProgress,
        logActivity,
        sendNotification,
        updateStats,
        calculateStreak,
        stats: userInteractions.stats,
        activities: userInteractions.activities,
        notifications: userInteractions.notifications,
        getProgress,
        lastVisited: userProgress?.lastVisited,
        completedCourses: userProgress?.completedCourses || []
    };
}; 