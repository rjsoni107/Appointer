import { useAuth } from '../../hook/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useDispatch } from 'react-redux';
import { openSidebar } from '../../store/reducerSlice/modalSlice';
import { Menu } from 'lucide-react';

export default function CrmHeader() {
    const { logout } = useAuth();
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-gradient-to-b from-[#f9fbff] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#0e1423] shadow-md fixed top-0 left-0 lg:left-64 right-0 lg:z-50">
            
            {/* ===== LEFT SIDE (Menu + Username) ===== */}
            <div className="flex items-center gap-3">
                {/* ☰ Menu Button — visible only on mobile */}
                <button
                    onClick={() => dispatch(openSidebar())}
                    className="lg:hidden flex items-center bg-blue-600 text-white p-2 rounded-md shadow-md"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* 👋 Username (hidden on mobile) */}
                <span className="hidden sm:block text-gray-700 dark:text-gray-200 ml-2">
                    {user?.name || "Hello Admin"}
                </span>
            </div>

            {/* ===== RIGHT SIDE (Theme Toggle + Logout) ===== */}
            <div className="flex items-center gap-3 sm:gap-4">
                <ThemeToggle />
                <button
                    onClick={logout}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1 rounded-full text-sm sm:text-base"
                >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
    );
}
