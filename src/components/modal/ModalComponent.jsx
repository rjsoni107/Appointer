import Modal from "./Modal";
import { LoginForm, RegistrationForm, ThankYouModal } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, closeRegister, closeThankYouModal } from "../../store/reducerSlice/modalSlice";

const ModalComponent = () => {
    const dispatch = useDispatch();
    const { isLoginOpen, isRegisterOpen, isThankYouOpen } = useSelector((state) => state.modal);

    return (
        <>
            <Modal open={isLoginOpen} onClose={() => dispatch(closeLogin())} title="Provider Login" modalHeader={true}>
                <LoginForm />
            </Modal>

            <Modal open={isRegisterOpen} onClose={() => dispatch(closeRegister())} title="Provider Sign Up" modalHeader={true}>
                <RegistrationForm />
            </Modal>

            <Modal open={isThankYouOpen} onClose={() => dispatch(closeThankYouModal())} modalHeader={false}>
                <ThankYouModal />
            </Modal>
        </>
    )
}
export default ModalComponent
