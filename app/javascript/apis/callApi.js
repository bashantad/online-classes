import {HEADERS, API_ROOT} from '../constants';

const callApi = {
    create: () => {
        return fetch(`${API_ROOT}/calls`, {
            method: "POST",
            headers: HEADERS,
        });
    },
    broadcast: (userId, callingCode, data) => {
        fetch(`${API_ROOT}/calls/${userId}/join/${callingCode}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data)
        });
    }
}

export default callApi;
