import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, ShoppingBag, Users, ChevronRight, Home, User } from 'lucide-react';
import logoLight from '../../assets/images/logo-light.webp';

export default function Sidebar() {
    const logoImageUrl = logoLight;
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            path: '/dashboard'
        },
        {
            id: 'my-orders',
            label: 'My Orders',
            icon: ShoppingBag,
            path: '/my-orders'
        },
        // {
        //     id: 'referrals',
        //     label: 'Referrals',
        //     icon: Users,
        //     path: '/referrals'
        // },
        {
            id: 'my-account',
            label: 'My Account',
            icon: User,
            path: '/my-account'
        },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-topHeaderColor dark:bg-gray-900 text-white dark:text-white">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-4 border-b border-lightNavyBlue dark:border-darkNavyBlue">

                <a className="flex items-center navbar-brand" href="/">
                    <img src={logoImageUrl} alt="logo" className="h-8 w-auto" />
                </a>
            </div>

            {/* Navigation */}
            <nav className="mt-6">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-lightNavyBlue transition-colors ${isActive ? 'bg-lightNavyBlue border-r-4 border-white dark:bg-darkNavyBlue dark:border-lightNavyBlue' : ''}`}
                        >
                            <div className="flex items-center">
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
