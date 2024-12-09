
function getApiBaseUrl() {
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    if (window && window.location) {
        return window.location.origin;
    }
    throw new Error("API base URL is not set.");
}

// Centralized API Base URL Configuration
const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;