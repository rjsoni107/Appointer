import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isKYCModal, setIsKYCModal] = useState(false);
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);

    const value = {
        isLoginOpen,
        setIsLoginOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        isKYCModal,
        setIsKYCModal,
        isThankYouOpen,
        setIsThankYouOpen,
    };

    return (
        <ModalContext.Provider value={value} >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};