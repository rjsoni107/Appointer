// ProviderRegistrationForm.jsx
import React, { useState } from "react";
import { InputField, PasswordFieldWithInfo } from "../../inputField";
import ProviderFormDTO from "./ProviderFormDTO";
import { ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { openLogin, closeRegister } from "../../../store/reducerSlice/modalSlice";
export default function ProviderForm() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        payload: {
            FIRST_NAME: "",
            LAST_NAME: "",
            EMAIL_ID: "",
            MOBILE: "",
            SERVICE_CATEGORY: "",
            EXPERIENCE: "",
            LOCATION: ""
            
        },
    });

    const { validateInputHandler, inputChangeHandler, inputMessageHandler } = ValidationHandler();

    const handleBlur = (evt) => {
        validateInputHandler(evt);
    };

    const formContext = { setState };

    const { providerFormSubmitHandler } = ProviderFormDTO(formContext);

    const fields = [
        { key: 'PRO_FIRST_NAME', name: 'FIRST_NAME', label: 'First Name', type: 'text', dataType: 'ALPHA_SPACE', placeholder: 'Enter first name' },
        { key: 'PRO_LAST_NAME', name: 'LAST_NAME', label: 'Last Name', type: 'text', dataType: 'ALPHA_SPACE', placeholder: 'Enter last name' },
        { key: 'PRO_MOBILE', name: 'MOBILE', label: 'Mobile', type: 'tel', dataType: 'NUMBER', dataValidation: 'MOBILE', maxLength: 10, placeholder: 'Enter mobile number' },
        { key: 'PRO_EMAIL_ID', name: 'EMAIL_ID', label: 'Email ID', type: 'email', dataType: 'EMAIL', dataValidation: 'EMAIL', placeholder: 'Enter email id' },
        { key: 'PRO_SERVICE_CATEGORY', name: 'SERVICE_CATEGORY', label: 'Service Category', type: 'text', dataType: 'ALPHA_SPACE', placeholder: 'Enter service category (e.g. Electrician)' },
        { key: 'PRO_EXPERIENCE', name: 'EXPERIENCE', label: 'Experience', type: 'text', dataType: 'NUMBER', dataValidation: 'EXPERIENCE', maxLength: 2, placeholder: 'Enter Experience (in years)' },
        { key: 'PRO_LOCATION', name: 'LOCATION', label: 'Location', type: 'text', dataType: 'ALPHA_NUMERIC_SPACE', placeholder: 'Enter City / Location' },

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
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={payload[field.name] || ""}
                        onBlur={handleBlur}
                        onChange={evt => {
                            inputChangeHandler(evt, setState);
                            inputMessageHandler(evt, 'HIDE', 'error', null, field.key);
                        }}
                        isRequired={true}
                        className="input-field"
                        dataType={field.dataType}
                        dataValidation={field.dataValidation}
                        maxLength={field.maxLength}
                    />
                ))}
            </div>

            <button
                type="submit"
                className=" mt-3 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                onClick={evt => providerFormSubmitHandler(evt, payload)}
            >
                Submit
            </button>

        </form>
    );
}