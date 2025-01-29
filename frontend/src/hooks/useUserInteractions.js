import { useSelector, useDispatch } from 'react-redux';
import {
    saveProject,
    unsaveProject,
    saveHackathon,
    unsaveHackathon,
    addBookmark,
    removeBookmark,
    updateProjectProgress,
    addNote,
    markProjectCompleted
} from '../redux/user/userSlice';

export const useUserInteractions = () => {
    const dispatch = useDispatch();
    const { currentUser, userInteractions } = useSelector(state => state.user);

    const handleSaveProject = (project) => {
        if (!currentUser) return false;
        dispatch(saveProject(project));
        return true;
    };

    const handleUnsaveProject = (projectId) => {
        if (!currentUser) return false;
        dispatch(unsaveProject(projectId));
        return true;
    };

    const handleSaveHackathon = (hackathon) => {
        if (!currentUser) return false;
        dispatch(saveHackathon(hackathon));
        return true;
    };

    const handleUnsaveHackathon = (hackathonId) => {
        if (!currentUser) return false;
        dispatch(unsaveHackathon(hackathonId));
        return true;
    };

    const handleBookmark = (item) => {
        if (!currentUser) return false;
        dispatch(addBookmark(item));
        return true;
    };

    const handleRemoveBookmark = (itemId) => {
        if (!currentUser) return false;
        dispatch(removeBookmark(itemId));
        return true;
    };

    const handleUpdateProgress = (projectId, progress) => {
        if (!currentUser) return false;
        dispatch(updateProjectProgress({ projectId, progress }));
        return true;
    };

    const handleAddNote = (itemId, note) => {
        if (!currentUser) return false;
        dispatch(addNote({ itemId, note }));
        return true;
    };

    const handleMarkCompleted = (projectId) => {
        if (!currentUser) return false;
        dispatch(markProjectCompleted(projectId));
        return true;
    };

    const isProjectSaved = (projectId) => {
        return userInteractions.savedProjects.some(p => p.id === projectId);
    };

    const isHackathonSaved = (hackathonId) => {
        return userInteractions.savedHackathons.some(h => h.id === hackathonId);
    };

    const isBookmarked = (itemId) => {
        return userInteractions.bookmarks.some(b => b.id === itemId);
    };

    const getProjectProgress = (projectId) => {
        return userInteractions.projectProgress[projectId] || 0;
    };

    const getNote = (itemId) => {
        return userInteractions.notes[itemId] || '';
    };

    const isProjectCompleted = (projectId) => {
        return userInteractions.completedProjects.includes(projectId);
    };

    return {
        savedProjects: userInteractions.savedProjects,
        savedHackathons: userInteractions.savedHackathons,
        bookmarks: userInteractions.bookmarks,
        completedProjects: userInteractions.completedProjects,
        handleSaveProject,
        handleUnsaveProject,
        handleSaveHackathon,
        handleUnsaveHackathon,
        handleBookmark,
        handleRemoveBookmark,
        handleUpdateProgress,
        handleAddNote,
        handleMarkCompleted,
        isProjectSaved,
        isHackathonSaved,
        isBookmarked,
        getProjectProgress,
        getNote,
        isProjectCompleted
    };
}; 