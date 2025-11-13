import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from '../sidebar';
import { CrmHeader } from '../header';
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';

const PrivateLayout = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="ml-64">
                {/* Header */}
                <CrmHeader />
                
                {/* Page Content */}
                <div className="px-6 pt-20">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PrivateLayout;