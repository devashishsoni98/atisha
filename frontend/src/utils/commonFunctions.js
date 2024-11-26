import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/userActions'; 
import { useNavigate } from 'react-router-dom';

export const useCommonFunctions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser()); // Dispatch logout action
        localStorage.removeItem('token'); // Clear token from local storage
        navigate(`/`); // Redirect to home or login page after logging out
    };

    return { handleLogout };
};