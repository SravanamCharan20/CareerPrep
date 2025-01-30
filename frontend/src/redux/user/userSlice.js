import {createSlice} from '@reduxjs/toolkit'

const loadUserInteractions = () => {
    try {
        const user = localStorage.getItem('user');
        if (!user) return null;
        
        const userId = JSON.parse(user)._id;
        const savedInteractions = localStorage.getItem(`userInteractions_${userId}`);
        return savedInteractions ? JSON.parse(savedInteractions) : null;
    } catch (error) {
        console.error('Error loading user interactions:', error);
        return null;
    }
};

const defaultInteractions = {
    bookmarks: [],
    preferences: {
        theme: 'dark',
        notifications: true,
        emailUpdates: true,
        language: 'en'
    },
    roadmapProgress: {
        frontend: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        backend: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        mobile: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        ai: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        }
    },
    activities: [],
    stats: {
        totalTimeSpent: 0
    }
};

const initialState = {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    loading: false,
    userProgress: localStorage.getItem('userProgress') ? JSON.parse(localStorage.getItem('userProgress')) : null,
    userInteractions: loadUserInteractions() || defaultInteractions
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
            
            // Load user interactions from localStorage
            const savedInteractions = loadUserInteractions();
            if (savedInteractions) {
                state.userInteractions = savedInteractions;
            }
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signUpStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
            
            // Initialize user interactions with the correct structure
            state.userInteractions = defaultInteractions;
            
            // Save initial interactions
            localStorage.setItem(`userInteractions_${action.payload._id}`, JSON.stringify(state.userInteractions));
        },
        signUpFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOut: (state) => {
            // Save interactions before signing out
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
            localStorage.removeItem('user');
            localStorage.removeItem('userProgress');
            state.currentUser = null;
            state.userProgress = initialState.userProgress;
            state.userInteractions = initialState.userInteractions;
        },
        updateUserProgress: (state, action) => {
            state.userProgress = {
                ...state.userProgress,
                ...action.payload
            };
            localStorage.setItem('userProgress', JSON.stringify(state.userProgress));
        },
        setLastVisited: (state, action) => {
            state.userProgress.lastVisited = action.payload;
            localStorage.setItem('userProgress', JSON.stringify(state.userProgress));
        },
        addCompletedCourse: (state, action) => {
            if (!state.userProgress.completedCourses.includes(action.payload)) {
                state.userProgress.completedCourses.push(action.payload);
                localStorage.setItem('userProgress', JSON.stringify(state.userProgress));
            }
        },
        updateRoadmapProgress: (state, action) => {
            const { roadmapId, data } = action.payload;
            
            // Ensure all required arrays exist
            if (!state.userInteractions.activities) {
                state.userInteractions.activities = [];
            }
            
            if (!state.userInteractions.roadmapProgress) {
                state.userInteractions.roadmapProgress = defaultInteractions.roadmapProgress;
            }

            // Update the progress for the specific roadmap
            state.userInteractions.roadmapProgress[roadmapId] = {
                ...state.userInteractions.roadmapProgress[roadmapId],
                ...data
            };

            // Add to activities
            state.userInteractions.activities.unshift({
                title: `Made progress in ${roadmapId.charAt(0).toUpperCase() + roadmapId.slice(1)} Development`,
                timestamp: new Date().toISOString()
            });

            // Save to localStorage
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
        },
        saveProject: (state, action) => {
            if (!state.userInteractions.savedProjects.some(p => p.id === action.payload.id)) {
                state.userInteractions.savedProjects.push(action.payload);
                if (state.currentUser) {
                    localStorage.setItem(
                        `userInteractions_${state.currentUser._id}`,
                        JSON.stringify(state.userInteractions)
                    );
                }
            }
        },
        unsaveProject: (state, action) => {
            state.userInteractions.savedProjects = state.userInteractions.savedProjects
                .filter(p => p.id !== action.payload);
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
        },
        saveHackathon: (state, action) => {
            if (!state.userInteractions.savedHackathons.some(h => h.id === action.payload.id)) {
                state.userInteractions.savedHackathons.push(action.payload);
                if (state.currentUser) {
                    localStorage.setItem(
                        `userInteractions_${state.currentUser._id}`, 
                        JSON.stringify(state.userInteractions)
                    );
                }
            }
        },
        unsaveHackathon: (state, action) => {
            state.userInteractions.savedHackathons = state.userInteractions.savedHackathons
                .filter(h => h.id !== action.payload);
            localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
        },
        addBookmark: (state, action) => {
            if (!state.userInteractions.bookmarks.some(b => b.id === action.payload.id)) {
                state.userInteractions.bookmarks.push(action.payload);
                if (state.currentUser) {
                    localStorage.setItem(
                        `userInteractions_${state.currentUser._id}`,
                        JSON.stringify(state.userInteractions)
                    );
                }
            }
        },
        removeBookmark: (state, action) => {
            state.userInteractions.bookmarks = state.userInteractions.bookmarks
                .filter(b => b.id !== action.payload);
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
        },
        updateProjectProgress: (state, action) => {
            const { projectId, progress } = action.payload;
            state.userInteractions.projectProgress[projectId] = progress;
            
            // Add activity
            state.userInteractions.activities.unshift({
                type: 'progress',
                title: `Updated project progress to ${progress}%`,
                timestamp: new Date().toISOString()
            });

            // Update stats if project completed
            if (progress === 100 && !state.userInteractions.completedProjects.includes(projectId)) {
                state.userInteractions.completedProjects.push(projectId);
                state.userInteractions.stats.projectsCompleted++;
                
                // Add notification
                state.userInteractions.notifications.unshift({
                    id: Date.now(),
                    type: 'achievement',
                    title: 'Project Completed!',
                    message: 'Congratulations on completing the project',
                    timestamp: new Date().toISOString(),
                    read: false
                });
            }

            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
        },
        addNote: (state, action) => {
            const { itemId, note } = action.payload;
            state.userInteractions.notes[itemId] = note;
            localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
        },
        updatePreferences: (state, action) => {
            state.userInteractions.preferences = {
                ...state.userInteractions.preferences,
                ...action.payload
            };
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
        },
        markProjectCompleted: (state, action) => {
            if (!state.userInteractions.completedProjects.includes(action.payload)) {
                state.userInteractions.completedProjects.push(action.payload);
                localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
            }
        },
        updateUserStats: (state, action) => {
            state.userInteractions.stats = {
                ...state.userInteractions.stats,
                ...action.payload
            };
            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
        },
        addActivity: (state, action) => {
            if (!state.userInteractions.activities) {
                state.userInteractions.activities = [];
            }
            
            // Add new activity with timestamp and unique ID
            const newActivity = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...action.payload
            };
            
            state.userInteractions.activities.unshift(newActivity);
            
            // Keep only last 50 activities
            if (state.userInteractions.activities.length > 50) {
                state.userInteractions.activities.pop();
            }

            // Save to localStorage if user is logged in
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`,
                    JSON.stringify(state.userInteractions)
                );
            }
        },
        addNotification: (state, action) => {
            state.userInteractions.notifications.unshift({
                ...action.payload,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                read: false
            });
            if (state.userInteractions.notifications.length > 50) {
                state.userInteractions.notifications.pop();
            }
            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
        },
        markNotificationAsRead: (state, action) => {
            const notification = state.userInteractions.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
        },
        updateUserProfile: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload
            };
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        clearNotifications: (state) => {
            state.userInteractions.notifications = [];
            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
        }
    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signOut,
    updateUserProgress,
    setLastVisited,
    addCompletedCourse,
    updateRoadmapProgress,
    saveProject,
    unsaveProject,
    saveHackathon,
    unsaveHackathon,
    addBookmark,
    removeBookmark,
    updateProjectProgress,
    addNote,
    updatePreferences,
    markProjectCompleted,
    updateUserStats,
    addActivity,
    addNotification,
    markNotificationAsRead,
    updateUserProfile,
    clearNotifications
} = userSlice.actions

export default userSlice.reducer;