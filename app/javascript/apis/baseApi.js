import {HEADERS, API_ROOT} from '../constants';

const fullUrl = (url) => `${API_ROOT}${url}`;

const baseApi = {
    get: (url) => {
        return fetch(fullUrl(url), {
            method: "GET",
            headers: HEADERS,
        });
    },
    post: (url, data = {}) => {
        return fetch(fullUrl(url), {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        });
    },
    delete: (url) => {
    	return fetch(fullUrl(url), {
            method: "DELETE",
            headers: HEADERS,
        });
    }
}

export default baseApi;
