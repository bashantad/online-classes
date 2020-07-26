import {HEADERS, API_ROOT} from '../constants';

const fullUrl = (url) => `${API_ROOT}${url}`;

const baseApi = {
    get: (url) => {
        return fetch(fullUrl(url), {
            method: "GET",
            headers: HEADERS,
        });
    },
    post: (url, data = {}, method = 'POST') => {
        return fetch(fullUrl(url), {
            method: method,
            headers: HEADERS,
            body: JSON.stringify(data),
        });
    },
    put: (url, data = {}) => {
        return baseApi.post(url, data, 'PUT');
    },
    delete: (url) => {
    	return fetch(fullUrl(url), {
            method: "DELETE",
            headers: HEADERS,
        });
    }
}

export default baseApi;
