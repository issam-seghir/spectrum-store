import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
    headers: {
        Accept: "application/json",
        // A harmless User-Agent may help avoid some generic blocks
        "User-Agent": "ScpectrumStore/1.0 (+https://example.com)",
    },
    timeout: 10000,
});

// Response interceptor to detect HTML pages (Cloudflare challenge) and throw a clearer error
apiClient.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
        const contentType = response.headers["content-type"] || "";
        const bodyIsHtml =
            typeof response.data === "string" &&
            response.data.trim().startsWith("<!DOCTYPE html>");

        if (contentType.includes("text/html") || bodyIsHtml) {
            const err: any = new Error("EXTERNAL_API_RETURNED_HTML");
            err.response = response;
            err.isExternalHtml = true;
            return Promise.reject(err);
        }

        return response;
    },
    (error: any) => {
        // If server returned HTML in an error response body, mark it
        const resp = error?.response;
        if (
            resp &&
            typeof resp.data === "string" &&
            resp.data.trim().startsWith("<!DOCTYPE html>")
        ) {
            const err: any = new Error("EXTERNAL_API_RETURNED_HTML");
            err.response = resp;
            err.isExternalHtml = true;
            return Promise.reject(err);
        }

        return Promise.reject(error);
    },
);

export default apiClient;
