import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    loading: false,
    userProgress: localStorage.getItem('userProgress') ? JSON.parse(localStorage.getItem('userProgress')) : {
        completedCourses: [],
        lastVisited: null,
        certifications: [],
        roadmapProgress: {}
    },
    userInteractions: localStorage.getItem('userInteractions') ? JSON.parse(localStorage.getItem('userInteractions')) : {
        savedProjects: [],
        savedHackathons: [],
        savedCertifications: [],
        bookmarks: [],
        completedProjects: [],
        projectProgress: {},
        notes: {},
        notifications: [],
        activities: [],
        stats: {
            projectsCompleted: 0,
            learningStreak: 0,
            totalTimeSpent: 0,
            certifications: 0
        },
        preferences: {
            theme: 'dark',
            notifications: true,
            emailUpdates: true,
            language: 'en'
        }
    }
}

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
            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
            
            // Load user's saved interactions from localStorage if they exist
            const savedInteractions = localStorage.getItem(`userInteractions_${action.payload._id}`);
            if (savedInteractions) {
                state.userInteractions = JSON.parse(savedInteractions);
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
            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
            
            // Initialize user interactions
            state.userInteractions = {
                savedProjects: [],
                savedHackathons: [],
                savedCertifications: [],
                bookmarks: [],
                completedProjects: [],
                projectProgress: {},
                notes: {},
                notifications: [],
                activities: [],
                stats: {
                    projectsCompleted: 0,
                    learningStreak: 0,
                    totalTimeSpent: 0,
                    certifications: 0
                },
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    emailUpdates: true,
                    language: 'en'
                }
            };
            // Save initial interactions
            localStorage.setItem(`userInteractions_${action.payload._id}`, JSON.stringify(state.userInteractions));
        },
        signUpFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOut: (state) => {
            // Save user interactions before signing out
            if (state.currentUser) {
                localStorage.setItem(
                    `userInteractions_${state.currentUser._id}`, 
                    JSON.stringify(state.userInteractions)
                );
            }
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.userProgress = {
                completedCourses: [],
                lastVisited: null,
                certifications: [],
                roadmapProgress: {}
            };
            // Don't clear userInteractions from localStorage
            localStorage.removeItem('user');
        },
        updateUserProgress: (state, action) => {
            state.userProgress = {
                ...state.userProgress,
                ...action.payload
            };
            // Save progress to localStorage
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
            state.userProgress.roadmapProgress = {
                ...state.userProgress.roadmapProgress,
                ...action.payload
            };
            localStorage.setItem('userProgress', JSON.stringify(state.userProgress));
        },
        saveProject: (state, action) => {
            if (!state.userInteractions.savedProjects.some(p => p.id === action.payload.id)) {
                state.userInteractions.savedProjects.push(action.payload);
                // Save to user-specific storage
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
            localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
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
            localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
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
            localStorage.setItem('userInteractions', JSON.stringify(state.userInteractions));
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
            state.userInteractions.activities.unshift({
                ...action.payload,
                timestamp: new Date().toISOString()
            });
            if (state.userInteractions.activities.length > 50) {
                state.userInteractions.activities.pop();
            }
            localStorage.setItem(`userInteractions_${state.currentUser._id}`, JSON.stringify(state.userInteractions));
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