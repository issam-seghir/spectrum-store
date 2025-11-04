export function mapApiError(error: any) {
    if (!error)
        return {
            message: "Unknown error",
            friendly: "An unexpected error occurred",
        };

    if (error.isExternalHtml) {
        return {
            message: "EXTERNAL_API_RETURNED_HTML",
            friendly:
                "Authentication service is temporarily unavailable. Please try again later.",
            status: error?.response?.status,
        };
    }

    const status = error?.response?.status;
    const data = error?.response?.data;

    return {
        message: data || error.message || String(error),
        friendly:
            data?.message ||
            data ||
            error.message ||
            "An error occurred while contacting the service.",
        status,
    };
}

export default mapApiError;
