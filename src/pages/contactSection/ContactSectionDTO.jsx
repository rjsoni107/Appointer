import { ValidationHandler } from "../../components";

const ContactSectionDTO = () => {
    const { validateFormHandler } = ValidationHandler();

    const submitHandler = (evt, payload) => {
        evt.preventDefault();
        const that = evt.target;

        if (validateFormHandler(that)) {
            console.log(payload)
        }
    }
    return { submitHandler };
};

export default ContactSectionDTO;