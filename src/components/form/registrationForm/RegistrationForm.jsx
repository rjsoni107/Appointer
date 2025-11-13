// RegistrationForm.jsx
import React, { useState } from "react";
import { InputField, PasswordFieldWithInfo } from "../../inputField";
import RegistrationFormDTO from "./RegistrationFormDTO";
import { ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { openLogin, closeRegister } from "../../../store/reducerSlice/modalSlice";
export default function RegistrationForm() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        payload: {
            FIRST_NAME: "",
            LAST_NAME: "",
            EMAIL_ID: "",
            MOBILE: "",
            PASSWORD: "",
            CONFIRM_PASSWORD: "",
            TERMS_ACCEPTED: false,
        },
    });

    const [hideTermsError, setHideTermsError] = useState(false);

    const { validateInputHandler, inputChangeHandler, inputMessageHandler } = ValidationHandler();

    const handleBlur = (evt) => {
        validateInputHandler(evt);
    };

    const onOpenLogin = () => {
        dispatch(closeRegister());
        dispatch(openLogin());
    };

    const formContext = { setState, hideTermsError, setHideTermsError };

    const { registrationFormSubmitHandler } = RegistrationFormDTO(formContext);

    const fields = [
        { key: 'FIRST_NAME', label: 'First Name', type: 'text', dataType: 'ALPHA_SPACE' },
        { key: 'LAST_NAME', label: 'Last Name', type: 'text', dataType: 'ALPHA_SPACE' },
        { key: 'MOBILE', label: 'Mobile', type: 'tel', dataType: 'NUMBER', dataValidation: 'MOBILE', maxLength: 10 },
        { key: 'EMAIL_ID', label: 'Email ID', type: 'email', dataType: 'EMAIL', dataValidation: 'EMAIL' },
    ];

    const payload = state.payload;

    return (
        <form className="form-section mt-5">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                {fields.map((field) => (
                    <InputField
                        key={field.key}
                        id={field.key}
                        type={field.type}
                        name={field.key}
                        label={field.label}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        value={payload[field.key] || ""}
                        onBlur={handleBlur}
                        onChange={evt => {
                            inputChangeHandler(evt, setState);
                            inputMessageHandler(evt, 'HIDE', 'error');
                        }}
                        isRequired={true}
                        className="input-field"
                        dataType={field.dataType}
                        dataValidation={field.dataValidation}
                        maxLength={field.maxLength}
                    />
                ))}
                <PasswordFieldWithInfo
                    id="PASSWORD"
                    label="Password"
                    name="PASSWORD"
                    isRequired={true}
                    type="password"
                    className="input-field"
                    placeholder="Enter your password"
                    value={payload.PASSWORD}
                    onBlur={handleBlur}
                    dataType="PASSWORD"
                    dataValidation="PASSWORD"
                    onChange={evt => {
                        inputChangeHandler(evt, setState);
                        inputMessageHandler(evt, 'HIDE', 'error');
                    }}
                />
                <PasswordFieldWithInfo
                    id="CONFIRM_PASSWORD"
                    name="CONFIRM_PASSWORD"
                    label="Confirm Password"
                    type="password"
                    className="input-field"
                    isRequired={true}
                    placeholder="Enter your password"
                    value={payload.CONFIRM_PASSWORD}
                    onBlur={handleBlur}
                    dataType="PASSWORD"
                    dataValidation="PASSWORD"
                    onChange={evt => {
                        inputChangeHandler(evt, setState);
                        inputMessageHandler(evt, 'HIDE', 'error');
                    }}
                />
            </div>
            {/* ✅ Terms Checkbox */}
            <div className="flex items-start mt-4">
                <input
                    type="checkbox"
                    id="TERMS_ACCEPTED"
                    name="TERMS_ACCEPTED"
                    checked={payload.TERMS_ACCEPTED}
                    onChange={(e) => {
                        setState((prev) => ({
                            ...prev,
                            payload: { ...prev.payload, TERMS_ACCEPTED: e.target.checked },
                        }));
                        setHideTermsError(false);
                    }}
                    className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="TERMS_ACCEPTED" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a href="/terms" className="text-indigo-600 dark:text-blue-400 hover:underline">
                        Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="/privacy" className="text-indigo-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                    </a>
                </label>
            </div>
            {hideTermsError && (
                <span className="text-red-500 text-xs" id="TERMS_ACCEPTED_ERROR">Please accept terms and conditions</span>
            )}

            <button
                type="submit"
                className=" mt-3 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                onClick={evt => registrationFormSubmitHandler(evt, payload)}
            >
                Create Account
            </button>

            <div className="text-center mt-3 text-sm">
                Already have an account?{" "}
                <button type="button" className="text-indigo-600 dark:text-blue-400 hover:underline" onClick={() => onOpenLogin()}>Login</button>
            </div>
        </form>
    );
}