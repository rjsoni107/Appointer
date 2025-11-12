const ERROR_TYPE = {
    MOBILE: {
        IS_BLANK: "Please enter mobile number",
        IS_INVALID: "Invalid mobile number",
        IS_EXIST: "Mobile number already exists"
    },
    EMAIL_ID: {
        IS_BLANK: "Please enter email id",
        IS_INVALID: "Invalid email id",
        IS_EXIST: "Email id already exists"
    },
    FIRST_NAME: {
        IS_BLANK: "Please enter first name",
        IS_INVALID: "Invalid first name"
    },
    LAST_NAME: {
        IS_BLANK: "Please enter last name",
        IS_INVALID: "Invalid last name"
    },
    PASSWORD: {
        IS_BLANK: "Please enter password",
        IS_INVALID: "Invalid password"
    },
    CONFIRM_PASSWORD: {
        IS_BLANK: "Please enter confirm password",
        IS_INVALID: "Invalid confirm password"
    },
    TERMS_ACCEPTED: {
        IS_BLANK: "Please accept terms and conditions"
    }
};

const getErrorMessage = (field, errorType) => {
    return ERROR_TYPE[field]?.[errorType] || "Please fill this field";
};

export { getErrorMessage };
