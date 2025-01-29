import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    
    if (!currentUser) {
        return <Navigate to="/signin" />;
    }
    
    return children;
}; 