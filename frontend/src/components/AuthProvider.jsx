import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../slice/authSlice';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { initialized, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Check authentication status when app loads
        if (!initialized) {
            dispatch(checkAuthStatus());
        }
    }, [dispatch, initialized]);

    // Show loading spinner while checking auth status
    if (!initialized && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default AuthProvider;