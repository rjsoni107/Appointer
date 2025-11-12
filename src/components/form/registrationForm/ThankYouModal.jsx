import { useDispatch } from "react-redux";
import { closeThankYouModal } from "../../../store/reducerSlice/modalSlice";
import { FaCheckCircle } from "react-icons/fa";

const ThankYouModal = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <FaCheckCircle className="text-6xl text-green-500 mb-3 text-center" />
            <h1 className="text-3xl font-bold mb-3 text-center text-indigo-600">Thank You</h1>
            <p className="text-gray-600 mb-3 text-center">Your account has been created successfully.</p>
            <button
                type="submit"
                className=" mt-4 w-48 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                onClick={() => dispatch(closeThankYouModal())}
            >
                Close
            </button>
        </div>
    );
};

export default ThankYouModal;