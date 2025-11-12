export const Base = () => {
    const fetchData = async (method, actionName, payload, isContentType, isStringify) => {
        const requestMetadata = {
            method: method,
            headers: { 'Accept': 'application/json' }
        };

        if (isContentType === undefined) {
            requestMetadata["headers"]["Content-Type"] = 'application/json';
        }

        if (payload !== null && payload !== undefined) {
            requestMetadata["body"] = isStringify === undefined ? JSON.stringify(payload) : payload;
        }

        try {
            const response = await fetch(actionName, requestMetadata);

            const data = await response.json();

            if (data !== null && data.responseCode !== undefined && data.responseCode === "002") {
                window.location.href = "/login";
            } else {
                return data;
            }
        } catch (error) {
            console.log(error);

            window.location.href = "/error";
            return null;
        }

    }

    const basePathAction = (action) => {
        const endPointWindowUrl = `${window.basePath}/${action}`
        return endPointWindowUrl;
    }

    return {
        fetchData,
        basePathAction,
    }
}
