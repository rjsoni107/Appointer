import { Base, ENDPOINTS, ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { closeLogin } from "../../../store/reducerSlice/modalSlice";
import { useNavigate } from "react-router-dom";

const LoginFormDTO = ({login}) => {
    const { validateFormHandler } = ValidationHandler();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { fetchData, basePathAction } = Base();

    const submitHandler = (evt, payload) => {
        evt.preventDefault();
        const that = evt.target;

        if (validateFormHandler(that)) {
            dispatch(closeLogin());
            console.log(payload)
            login(payload)
            // navigate('/dashboard');
            // fetchData('POST', basePathAction(ENDPOINTS.LOGIN), payload).then(responseJson => {
            //     console.log(responseJson)
            // });
        }
    }
    return { submitHandler };
};

export default LoginFormDTO;