import { getErrorMessage } from "./ErrorType";
import { getRegex } from "./RegexType";

export const ValidationHandler = () => {
    const isValueExist = (data) => data !== null && data !== undefined;

    const isValueExistAndBlank = (data) => data !== null && data !== undefined && data !== '';

    const showMessage = (errorElement, message) => {
        if (errorElement && message !== undefined && errorElement !== null) {
            errorElement.classList.add("show");
            errorElement.innerHTML = message;
        }
    };

    const hideMessage = (errorElement) => {
        if (errorElement) {
            errorElement.classList.remove("show");
            errorElement.innerHTML = '';
        }
    };

    const removeExtraSpace = (text, regex) => {
        const removedSpace = text.replace(regex, ' ');
        return removedSpace.replace(/^\s*/, '');
    }

    const updateValue = (that, newValue, toRemove, stateName, propsPayload, setState, nestedStatename, nestedObjectState) => {
        const payload = propsPayload !== undefined ? propsPayload : 'payload';

        let value = '';
        const elementName = stateName !== undefined ? stateName : that.getAttribute('name');

        switch (toRemove) {
            case 'ALPHA_NUMERIC_SPACE':
                value = removeExtraSpace(newValue, /(\s{2,})|[^a-zA-Z0-9]/g);
                break;

            case 'ALPHA_SPACE':
                value = removeExtraSpace(newValue, /(\s{2,})|[^a-zA-Z]/g);
                break;

            case 'ZERO':
                value = removeZero(newValue);
                break;

            default:
                value = newValue;
                break;
        }

        if (nestedObjectState) {
            setState(prevState => ({
                ...prevState,
                [payload]: {
                    ...prevState[payload],
                    [nestedStatename]: {
                        ...prevState[payload][nestedStatename],
                        [elementName]: value
                    }
                }
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [payload]: {
                    ...prevState[payload],
                    [elementName]: value
                }
            }));
        }
    }

    const removeZero = text => {
        const regex = getRegex('NUMBER_WITHOUT_ZERO', 'DATA_VALIDATION');

        if (!regex.test(text)) {
            return text.substring(0, text.length - 1);
        }

        return text;
    }

    const allowOnlyOnce = obj => {
        const keyCode = obj.event.keyCode,
            key = obj.event.key;

        if (keyCode === obj.keyCode && key === obj.allowedChar) {
            const value = obj.event.target.value,
                splitedValue = value.split(obj.allowedChar);

            if (splitedValue.length === 2) {
                obj.event.preventDefault();
            }
        }
    }

    const upperCaseHandler = (evt) => {
        const that = evt.target;
        that.value = that.value.toUpperCase();
    }

    const lowerCaseHandler = evt => {
        const that = evt.target;
        that.value = that.value.toLowerCase();
    }

    const inputChangeHandler = (evt, setState, stateName, propsPayload, nestedStateName, nestedObjectState = false) => {
        try {
            const that = evt.target,
                value = that.value,
                dataType = that.getAttribute("data-type"),
                dataRemove = that.getAttribute('data-remove'),
                elementName = stateName !== undefined ? stateName : that.getAttribute('name'),
                payload = propsPayload !== undefined ? propsPayload : 'payload';


            if (value === " ") {
                evt.preventDefault();
            } else if (dataType !== undefined && dataType !== null) {
                const regex = getRegex(dataType, 'DATA_TYPE'),
                    newVal = value.replace(regex, '');

                updateValue(that, newVal, dataRemove, stateName, propsPayload, setState, nestedStateName, nestedObjectState);
            } else {

                if (nestedObjectState) {
                    setState(prevState => ({
                        ...prevState,
                        [payload]: {
                            ...prevState[payload],
                            [nestedStateName]: {
                                ...prevState[payload][nestedStateName],
                                [elementName]: value
                            }
                        }
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState,
                        [payload]: {
                            ...prevState[payload],
                            [elementName]: value
                        }
                    }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const inputMessageHandler = (evt, action, type, message, $elementId) => {
        try {
            const that = evt.target || evt;
            const elementId = that.id || that.name;
            let errorElement = document.getElementById(`${type}-${elementId}`);

            if(errorElement === null) {
                errorElement = document.getElementById(type.toLowerCase() + "-" + $elementId);
            }

            switch (action) {
                case "SHOW":
                    if (type === 'error') {
                        that.classList.add("is-invalid");
                        that.classList.remove("is-valid");
                    } else if (type === 'success') {
                        that.classList.remove("is-invalid");
                        that.classList.add("is-valid");
                        that.disabled = true;
                    }
                    showMessage(errorElement, message);
                    break;
                case "HIDE":
                    that.classList.remove("is-invalid", "is-valid");
                    that.disabled = false;
                    hideMessage(errorElement);
                    break;
                case 'SHOW_MSG_ONLY':
                    showMessage(errorElement, message);
                    break;
                case 'HIDE_MSG_ONLY':
                    hideMessage(errorElement);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateFieldValue = (value, validationType) => {
        try {
            const regex = getRegex(validationType, 'DATA_VALIDATION');
            return regex.test(value);
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const selectBoxChangeHandler = (that, stateName, propsPayload, setState, nestedStatename, nestedObjectState) => {
        const payload = propsPayload ? propsPayload : 'payload';
        const $option = [{ value: that.value, label: that.label }];

        if (nestedObjectState) {
            setState(prevState => ({
                ...prevState,
                [payload]: {
                    ...prevState[payload],
                    [nestedStatename]: {
                        ...prevState[payload][nestedStatename],
                        [stateName]: that.value
                    }
                }
            }));
        }
        else if (propsPayload !== undefined) {
            setState(prevState => ({
                ...prevState,
                [payload]: {
                    ...prevState[payload],
                    [stateName]: that.value
                },
                [stateName]: $option
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [stateName]: $option
            }));
        }
    }

    const removeLeadingDot = evt => {
        const that = evt.target || evt;
        that.value = that.value.replace(/^\./, '');
    }

    const decimalLimit = (evt, limit) => {
        const that = evt.target;
        const value = that.value;
        that.value = value.indexOf(".") >= 0 ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), Number(limit) + 1)) : value;
    }

    const removeLeadingAt = that => {
        that.value = that.value.replace(/^@/, '');
    }

    const removeLeadingHyphen = that => {
        that.value = that.value.replace(/^-/, '');
    }

    const removeLeadingUnderscore = that => {
        that.value = that.value.replace(/^_/, '');
    }

    const removeLeadingEmailChar = evt => {
        const that = evt.target,
            firstChar = that.value.charAt(0);


        switch (firstChar) {
            case '@':
                removeLeadingAt(that);
                break;

            case '.':
                removeLeadingDot(that);
                break;

            case '-':
                removeLeadingHyphen(that);
                break;

            case '_':
                removeLeadingUnderscore(that);
                break;

            default:
                break;
        }
    }

    const validateInputHandler = (evt, msgFlag, requiredFlag) => {
        try {
            let result = true;

            if (evt !== null) {
                const that = evt.target || evt,
                    value = that.value,
                    elementName = that.getAttribute("name"),
                    validationType = that.getAttribute("data-validation"),
                    hasValidationKey = validationType !== null,
                    isRequired = requiredFlag !== undefined ? requiredFlag : that.hasAttribute("required");

                switch (isRequired) {
                    case true:
                        if (value === "") {
                            if (msgFlag || msgFlag === undefined) {
                                const errorMsg = getErrorMessage(elementName, "IS_BLANK");
                                inputMessageHandler(that, 'HIDE', 'success');
                                inputMessageHandler(that, 'SHOW', 'error', errorMsg);
                            }
                            result = false;
                        } else if (hasValidationKey && !validateFieldValue(value, validationType)) {
                            if (msgFlag || msgFlag === undefined) {
                                const errorMsg = getErrorMessage(elementName, "IS_INVALID");
                                inputMessageHandler(that, 'HIDE', 'success');
                                inputMessageHandler(that, 'SHOW', 'error', errorMsg);
                            }
                            result = false;
                        }
                        break;

                    case false:
                        if (value !== "" && hasValidationKey && !validateFieldValue(value, validationType)) {
                            const errorMsg = getErrorMessage(elementName, "IS_INVALID");
                            inputMessageHandler(that, 'HIDE', 'success');
                            inputMessageHandler(that, 'SHOW', 'error', errorMsg);
                            result = false;
                        }
                        break;
                }
            }

            return result;
        } catch (error) {
            console.error(error);
        }
    };

    const validateFormHandler = (that) => {
        let count = 0;
        let errorElement = null;

        const getErrorElement = (element) => {
            if (errorElement === null) {
                errorElement = element;
            }
        }

        const form = that.closest('.form-section'),

            inputFields = form.querySelectorAll('.input-field');

        inputFields.forEach(element => {
            const elementType = element.tagName;
            const evtName = element.querySelector(`input[name="${element.id}"]`);
            const evtType = element.querySelector('input[type="hidden"]');
            const requiredFlag = element.classList.contains('is-required')

            if (elementType === 'DIV' && element.classList.contains('react-date-picker') && !validateInputHandler(evtName, undefined, requiredFlag)) {
                count++;
                getErrorElement(element);
            } else if (elementType === 'DIV' && !validateInputHandler(evtType, undefined, requiredFlag)) {
                count++;
                getErrorElement(element);
            } else if (elementType === 'INPUT') {
                if (!validateInputHandler(element)) {
                    count++;
                    getErrorElement(element);
                }
            }
        });

        if (errorElement !== null) {
            if (errorElement.tagName !== 'DIV') {
                errorElement.focus();
            } else {
                const scrollHeight = errorElement.offsetTop;
                window.scrollTo({
                    top: scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }
        }

        return count === 0;
    }

    const validateIsInvalid = () => {
        const isInvalidElements = document.querySelectorAll("input.is-invalid, select.is-invalid");
        return isInvalidElements.length === 0;
    };

    const clearErrorMessage = (stateName) => {
        const errorMessageSpan = document.getElementById(`error-${stateName}`);
        if (errorMessageSpan) {
            errorMessageSpan.textContent = "";
            errorMessageSpan.classList.remove("error-msg-show");
        }
    };

    const imageUploadHandler = (evt, stateName = "payload", nestedStatename, setState, nestedSetState = false) => {
        const that = evt.target,
            file = that.files[0];

        const updateImageState = (base64) => {
            const isFileExist = file !== undefined;
            const fileName = isFileExist ? file.name : '';

            if (!nestedSetState) {
                setState(prevState => ({
                    [stateName]: {
                        ...prevState.payload,
                        [that.name]: base64,
                        [`${that.name}_NAME`]: fileName
                    }
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    [stateName]: {
                        ...prevState[stateName],
                        [nestedStatename]: {
                            ...prevState[stateName][nestedStatename],
                            [that.name]: base64,
                            [`${that.name}_NAME`]: fileName
                        }
                    },
                }));
            }
        }

        if (file !== undefined) {
            const reader = new FileReader();

            reader.onload = $evt => {
                const $that = $evt.target;
                const base64 = $that.result;

                updateImageState(base64);
            }

            reader.readAsDataURL(file);
        } else {
            updateImageState('');
        }
    }

    const updateStatus = (that, status, fileName) => {
        const elementId = that.getAttribute('id'),
            statusElement = document.getElementById(elementId + '-status'),
            fileNameElement = document.getElementById(elementId + '-name');

        fileNameElement.innerHTML = fileName;
        statusElement.innerHTML = status;
    }


    const validateExtension = that => {
        const allowedFiles = that.getAttribute('accept').toLowerCase(),
            elementName = that.getAttribute('name'),
            elementSize = that.getAttribute('data-size'),
            placeholder = that.getAttribute('placeholder'),
            file = that.files[0],
            fileName = file.name,
            fileType = fileName.split('.').pop().toLowerCase(),
            fileSize = file.size,
            hasClassNewUploader = that.classList.contains('newUploader');

        if (allowedFiles.includes(fileType)) {
            if (fileSize > Number(elementSize)) {
                inputMessageHandler(that, 'SHOW', 'error', getErrorMessage(elementName, 'IS_INVALID_SIZE'));
                !hasClassNewUploader && updateStatus(that, 'Choose File', placeholder);
                that.value = "";

                return false;
            } else {
                inputMessageHandler(that, 'HIDE', 'error');
                !hasClassNewUploader && updateStatus(that, 'Uploaded', fileName);

                return true;
            }
        } else {
            inputMessageHandler(that, 'SHOW', 'error', getErrorMessage(elementName, "IS_INVALID"));
            !hasClassNewUploader && updateStatus(that, 'Choose File', placeholder);
            that.value = "";

            return false;
        }
    }

    const inputFileHandler = (evt, klass) => {
        const that = evt.target !== undefined ? evt.target : evt,
            isRequired = that.hasAttribute('required'),
            elementName = that.getAttribute('name'),
            placeholder = that.getAttribute('placeholder'),
            value = that.value,
            hasClassNewUploader = that.classList.contains('newUploader');

        if (isRequired) {
            if (value !== "") {
                return validateExtension(that);
            } else if (klass !== undefined && klass.state.payload[elementName] !== '') {
                return true;
            } else {
                const errorMsg = getErrorMessage(elementName, "IS_BLANK");
                inputMessageHandler(that, 'SHOW', 'error', errorMsg);
                if (!hasClassNewUploader) {
                    updateStatus(that, 'Choose File', placeholder);
                }
                return false;
            }
        } else if (value !== "") {
            return validateExtension(that);
        } else if (value === "") {

            if (!hasClassNewUploader) {
                updateStatus(that, 'Choose File', placeholder);
            }
            if (hasClassNewUploader && !isRequired) {
                inputMessageHandler(that, 'HIDE', 'error');
                return true;
            }
            return false;
        }
        return true;
    }
    return {
        isValueExist,
        isValueExistAndBlank,
        inputMessageHandler,
        validateInputHandler,
        validateFormHandler,
        allowOnlyOnce,
        upperCaseHandler,
        lowerCaseHandler,
        inputChangeHandler,
        selectBoxChangeHandler,
        removeLeadingEmailChar,
        getErrorMessage,
        removeLeadingDot,
        decimalLimit,
        showMessage,
        hideMessage,
        validateIsInvalid,
        clearErrorMessage,
        inputFileHandler,
        imageUploadHandler
    };
};