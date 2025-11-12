import { ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { closeRegister, openThankYouModal } from "../../../store/reducerSlice/modalSlice";

const RegistrationFormDTO = ({ setState, hideTermsError, setHideTermsError }) => {
    const { validateFormHandler, inputMessageHandler } = ValidationHandler();
    const dispatch = useDispatch();

    // RegistrationForm.jsx
    const registrationFormSubmitHandler = (evt, payload) => {
        evt.preventDefault();
        const that = evt.target;

        // Early check: password and confirm password must match
        const passwordInput = document.getElementById('PASSWORD');
        const confirmInput = document.getElementById('CONFIRM_PASSWORD');
        const termsInput = document.getElementById('TERMS_ACCEPTED');
        if (passwordInput && confirmInput && passwordInput.value !== confirmInput.value) {
            inputMessageHandler(confirmInput, 'SHOW', 'error', 'Password and Confirm Password must match');
            confirmInput.focus();
            return;
        }

        if (validateFormHandler(that)) {
            if (!termsInput.checked) {
                setHideTermsError(true);
                return;
            }
            console.log('inner Form submitted successfully:', payload);
            dispatch(closeRegister());
            dispatch(openThankYouModal());
        }
    }

    return { registrationFormSubmitHandler };
};

export default RegistrationFormDTO;