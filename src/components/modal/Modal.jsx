// Modal.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as LucideIcons from "lucide-react";

export default function Modal({ open, onClose, title, subtitle, children, modalHeader, key }) {
    const [shouldRender, setShouldRender] = useState(open);
    const [animState, setAnimState] = useState(open ? "enter" : "exit");
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        let timeout;
        if (open) {
            setShouldRender(true);
            setAnimState("exit");
            timeout = setTimeout(() => setAnimState("enter"), 10);
        } else {
            setAnimState("exit");
            timeout = setTimeout(() => setShouldRender(false), 250);
        }
        return () => clearTimeout(timeout);
    }, [open, onClose]);

    if (!open) return null;

    const stopPropagation = (e) => e.stopPropagation();

    const overlayClass = animState === "enter" ? "opacity-100" : "opacity-0";
    const panelClass = animState === "enter" ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0";

    return createPortal(
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            aria-modal="true"
            id={key}
            role="dialog"
        // onClick={onClose}
        >
            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${overlayClass}`} />
            <div
                ref={modalRef}
                className={`bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-xl w-full max-w-lg mx-4 transform transition-all duration-200 backdrop-blur ${panelClass}`}
                onClick={stopPropagation}
            >
                {modalHeader && <div className="px-6 pt-4 pb-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl dark:bg-gray-800 dark:text-white">
                    <div className="flex flex-col">
                        {title && <h5 className="text-2xl font-semibold text-[#214360] dark:text-white mb-1">{title}</h5>}
                        {subtitle && <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
                    </div>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <LucideIcons.X className="w-5 h-5" />
                    </button>
                </div>}

                <div className="p-6 pt-1.5 max-h-[85vh] min-h-[35vh] rounded-2xl overflow-y-auto scrollbar-none dark:bg-gray-800 dark:text-white">{children}</div>
            </div>
        </div>,
        document.body
    );
}
