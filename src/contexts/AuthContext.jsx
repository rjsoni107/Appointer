import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const savedUserRaw = localStorage.getItem('user');
    const initialUser = savedLoginStatus && savedUserRaw ? JSON.parse(savedUserRaw) : null;
    const [isLoggedIn, setIsLoggedIn] = useState(savedLoginStatus);
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        // Check if user is logged in from localStorage on app start
        const currentSavedLogin = localStorage.getItem('isLoggedIn') === 'true';
        const currentSavedUser = localStorage.getItem('user');
        if (currentSavedLogin && currentSavedUser) {
            setUser(JSON.parse(currentSavedUser));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    };

    const value = {
        isLoggedIn,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext };