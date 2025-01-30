import { useSelector, useDispatch } from 'react-redux';
import {
    addBookmark,
    removeBookmark,
} from '../redux/user/userSlice';

export const useUserInteractions = () => {
    const dispatch = useDispatch();
    const { currentUser, userInteractions } = useSelector(state => state.user);

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

    const isBookmarked = (itemId) => {
        return userInteractions.bookmarks.some(b => b.id === itemId);
    };

    return {
        bookmarks: userInteractions.bookmarks,
        handleBookmark,
        handleRemoveBookmark,
        isBookmarked,
    };
}; 