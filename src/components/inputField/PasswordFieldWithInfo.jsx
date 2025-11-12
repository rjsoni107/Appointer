import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";

const PasswordFieldWithInfo = (props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ right: 0, bottom: 0 });
    const buttonRef = useRef(null);

    const passwordRequirements = [
        "At least 8 characters long",
        "One uppercase letter (A-Z)",
        "One lowercase letter (a-z)",
        "One number (0-9)",
        "One special character (#?!@$%^&*-)"
    ];

    useEffect(() => {
        if (!showTooltip || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const right = Math.max(8, window.innerWidth - rect.right);
        const bottom = Math.max(8, window.innerHeight - rect.top + 8); // place above with 8px gap
        setPosition({ right, bottom });
    }, [showTooltip]);

    return (
        <div className="mb-4 col-span-1 relative">
            {props.label && (
                <label htmlFor={props.id} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {props.label} {props.isRequired ? <span className="text-red-600 dark:text-red-400">*</span> : null}
                </label>
            )}

            <div className="relative">
                <input
                    ref={props.ref}
                    type={props.type !== undefined ? props.type : 'password'}
                    id={props.id}
                    data-regex={props.dataRegex}
                    name={props.name}
                    maxLength={props.maxLength}
                    className={`form-control py-2 px-3 dark:bg-gray-800 dark:text-white ${props.className !== undefined ? props.className : ''}`}
                    autoComplete={props.autoComplete}
                    onBlur={props.onBlur}
                    onInput={props.onInput}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    value={props.value}
                    readOnly={props.readOnly}
                    min={props.min}
                    max={props.max}
                    required={props.isRequired}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    data-remove={props.dataRemove}
                    data-type={props.dataType}
                    data-validation={props.dataValidation}
                />

                <button
                    ref={buttonRef}
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                >
                    <Info size={16} />
                </button>

                {showTooltip && createPortal(
                    (
                        <div
                            className="fixed z-[2000] w-[245px] bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg dark:bg-gray-800 dark:text-white"
                            style={{ right: position.right, bottom: position.bottom }}
                        >
                            <div className="font-semibold mb-2">Password Requirements:</div>
                            <ul className="space-y-1">
                                {passwordRequirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green-400 mr-2">•</span>
                                        {requirement}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="fixed w-2 h-2 bg-gray-800 transform rotate-45 dark:bg-gray-800 dark:text-white"
                                style={{ right: position.right + 12, bottom: position.bottom - 2 }}
                            />
                        </div>
                    ),
                    document.body
                )}
            </div>

            <span className={`text-red-600 dark:text-red-400 absolute text-xs right-0`} id={`error-${props.name}`}>
                {props.errorMessage}
            </span>
        </div>
    );
};

export default PasswordFieldWithInfo;
