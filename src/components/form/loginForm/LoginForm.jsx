// LoginForm.jsx
import { useState } from "react";
import { InputField, PasswordFieldWithInfo } from "../../inputField";
import { ValidationHandler } from "../../utility";
import { useDispatch } from "react-redux";
import { openRegister, closeLogin } from "../../../store/reducerSlice/modalSlice";
import LoginFormDTO from "./LoginFormDTO";
import { useAuth } from "../../../hook/useAuth";

export default function LoginForm() {
    const [state, setState] = useState({
        payload: {
            MOBILE: "",
            PASSWORD: "",
        },
    });

    const { login } = useAuth();
    const dispatch = useDispatch();

    const {
        validateInputHandler,
        inputChangeHandler,
        inputMessageHandler,
    } = ValidationHandler();

    const handleBlur = (evt) => {
        validateInputHandler(evt);
    };

    const onOpenRegister = () => {
        dispatch(closeLogin());
        setTimeout(() => dispatch(openRegister()), 300);
    };

    const { submitHandler } = LoginFormDTO({ login });
    const { payload } = state;

    return (
        <form className="form-section mt-5">
            <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-x-4 ">
                <InputField
                    key="MOBILE"
                    id="MOBILE"
                    name="MOBILE"
                    label="Mobile No"
                    type="tel"
                    isRequired={true}
                    placeholder="Enter your mobile number"
                    className="input-field"
                    value={payload.MOBILE}
                    maxLength={10}
                    onChange={evt => {
                        inputChangeHandler(evt, setState);
                        inputMessageHandler(evt, 'HIDE', 'error');
                    }}
                    onBlur={handleBlur}
                    dataType="NUMBER"
                    dataValidation="MOBILE"
                />
                <PasswordFieldWithInfo
                    key="PASSWORD"
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
            </div>

            <button
                type="submit"
                className=" mt-5 w-full py-2.5 rounded-lg bg-indigo-600 dark:bg-blue-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                onClick={evt => submitHandler(evt, payload)}
            >
                Login
            </button>

            <div className="text-center mt-3 text-sm">
                Don't have an account?{" "}
                <button type="button" className="text-indigo-600 dark:text-blue-300 hover:underline" onClick={() => onOpenRegister()}>Create Account</button>
            </div>
        </form>
    );
}
