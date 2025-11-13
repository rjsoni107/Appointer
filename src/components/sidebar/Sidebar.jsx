import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Home, ShoppingBag, User, Menu, X } from "lucide-react";
import logoLight from "../../assets/images/logo-light.webp";
import { useDispatch } from "react-redux";
import { openSidebar, closeSidebar } from "../../store/reducerSlice/modalSlice";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.modal.isSidebarOpen);

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
        { id: "my-orders", label: "My Bookings", icon: ShoppingBag, path: "/my-orders" },
        { id: "my-account", label: "My Account", icon: User, path: "/my-account" },
    ];

    return (
        <>
            {/* Sidebar Drawer */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-topHeaderColor dark:bg-gray-900 text-white transform 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 transition-transform duration-300 z-40`}
            >
                {/* Header inside sidebar */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                    <img src={logoLight} alt="logo" className="h-8 w-auto" />
                    <button
                        onClick={() => dispatch(closeSidebar())}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.path);
                                    dispatch(closeSidebar());
                                }}
                                className={`w-full flex items-center justify-between px-6 py-3 text-left text-sm 
                                ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-600"}`}
                            >
                                <div className="flex items-center">
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Overlay on mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => dispatch(closeSidebar())}
                ></div>
            )}
        </>
    );
}
