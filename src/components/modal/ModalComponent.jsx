import Modal from "./Modal";
import { LoginForm, RegistrationForm, ThankYouModal, ProviderForm } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, closeRegister, closeThankYouModal, closeProviderRegister } from "../../store/reducerSlice/modalSlice";

const ModalComponent = () => {
    const dispatch = useDispatch();
    const { isLoginOpen, isRegisterOpen, isThankYouOpen, isProviderRegisterOpen } = useSelector((state) => state.modal);

    return (
        <>
            <Modal
                open={isLoginOpen}
                onClose={() => dispatch(closeLogin())}
                title="Provider Login"
                subtitle="Enter your credentials to login"
                modalHeader={true}
            >
                <LoginForm />
            </Modal>

            <Modal
                open={isRegisterOpen}
                onClose={() => dispatch(closeRegister())}
                title="Sign Up"
                subtitle="Enter your credentials to register"
                modalHeader={true}
            >
                <RegistrationForm />
            </Modal>

            <Modal
                open={isProviderRegisterOpen}
                onClose={() => dispatch(closeProviderRegister())}
                title="Become a Provider"
                subtitle="Join Appointer and start offering your services today!"
                modalHeader={true}
            >
                <ProviderForm />
            </Modal>

            <Modal
                open={isThankYouOpen}
                onClose={() => dispatch(closeThankYouModal())}
                modalHeader={false}
            >
                <ThankYouModal />
            </Modal>
        </>
    )
}
export default ModalComponent
