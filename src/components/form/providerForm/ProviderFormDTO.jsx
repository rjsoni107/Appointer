import { ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { closeProviderRegister, openThankYouModal } from "../../../store/reducerSlice/modalSlice";

const ProviderFormDTO = ({ setState }) => {
    const { validateFormHandler } = ValidationHandler();
    const dispatch = useDispatch();

    // RegistrationForm.jsx
    const providerFormSubmitHandler = (evt, payload) => {
        evt.preventDefault();
        const that = evt.target;

        if (validateFormHandler(that)) {
            console.log('Provider Form submitted successfully:', payload);
            dispatch(closeProviderRegister());
            dispatch(openThankYouModal());
        }
    }

    return { providerFormSubmitHandler };
};

export default ProviderFormDTO;