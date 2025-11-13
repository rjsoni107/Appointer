 import { useAuth } from '../../hook/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function CrmHeader() {
    const { logout } = useAuth();
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-gradient-to-b from-[#f9fbff] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#0e1423] shadow-md fixed top-0 left-64 right-0 flex items-center justify-between z-50">
            <span className="text-gray-700 font-medium dark:text-gray-200 ml-6">{user?.name || 'Hello Admin'}</span>
            <div className="flex items-center justify-end px-6 py-3 space-x-4">
                <ThemeToggle />
                <button
                    onClick={logout}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 rounded-full font-medium transition hover:border-blue-600 dark:hover:border-blue-600 "
                >
                    <FaSignOutAlt className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
