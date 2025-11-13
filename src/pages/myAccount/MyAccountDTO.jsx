import { ENDPOINTS } from "../../components";
import { useState } from "react";

const MyAccountDTO = ({ setState, validateFormHandler, fetchData, basePathAction, fileToBase64 }) => {

    const submitHandler = (evt, payload) => {
        evt.preventDefault();

        const that = evt.target;

        if (validateFormHandler(that)) {
            console.log(payload)

            // fetchData('POST', basePathAction(ENDPOINTS.UPDATE_PROFILE), payload).then(responseJson => {
            //     console.log(responseJson)
            // });
        }
    }

    const uploadProfilePicHandler = async (evt) => {
        const file = evt.target.files[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                setState((prev) => ({
                    ...prev,
                    payload: {
                        ...prev.payload,
                        PROFILE_PICTURE: base64
                    }
                }));
            } catch (err) {
                console.error('Failed to convert image to base64', err);
            }
        }
    }
    return { submitHandler, uploadProfilePicHandler };
}

export default MyAccountDTO;
