// components/common/AuthButtons.jsx
import React from "react";
import { FaUserPlus, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hook/useAuth";
import { useDispatch } from "react-redux";
import { closeLogin, closeRegister, openLogin, openRegister, openProviderRegister } from "../../store/reducerSlice/modalSlice";
import { useNavigate } from "react-router-dom";

const AuthButtons = ({ variant }) => {
    // variant = "desktop" | "mobile"
    // use to return different sizes & classes

    const { isLoggedIn, logout } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openLoginModal = () => {
        dispatch(closeRegister());
        setTimeout(() => dispatch(openLogin()), 0);
    };

    const openRegisterModal = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openRegister()), 0);
    };

    const openProviderRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openProviderRegister()), 0);
    };

    const btnSize = variant === "mobile" ? "px-5 py-2 text-sm w-1/2" : "px-5 py-1 text-base";

    return (
        <div className={`flex items-center gap-2 ${variant === "mobile" ? "w-full justify-center" : ""}`}>
            {isLoggedIn ? (
                <>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`flex items-center gap-1 text-blue-600 bg-white border border-blue-600 rounded-full hover:border-blue-600 hover:text-blue-800 transition ${btnSize}`}
                    >
                        <FaUser className="w-4 h-4" /> Dashboard
                    </button>

                    <button
                        onClick={logout}
                        className={`flex items-center gap-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition ${btnSize}`}
                    >
                        <FaSignOutAlt className="w-4 h-4" /> Logout
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={openLoginModal}
                        className={`flex items-center gap-1 text-blue-600 bg-white border border-blue-600 rounded-full hover:text-blue-800 hover:border-blue-600 transition ${btnSize}`}
                    >
                        <FaSignInAlt className="w-4 h-4" /> Login
                    </button>

                    <button
                        onClick={openRegisterModal}
                        className={`flex items-center gap-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition ${btnSize}`}
                    >
                        <FaUserPlus className="w-4 h-4" /> Sign Up
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
