import {HEADERS, API_ROOT} from '../constants';

const callApi = {
    create: () => {
        return fetch(`${API_ROOT}/calls`, {
            method: "POST",
            headers: HEADERS,
        });
    },
    broadcast: (creatorId, callingCode, data) => {
        fetch(`${API_ROOT}/calls/${creatorId}/join/${callingCode}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data)
        });
    },
    checkCallingUrl: (creatorId, callingCode) => {
        return fetch(`${API_ROOT}/calls/${creatorId}/join/${callingCode}`, {
            method: "GET",
            headers: HEADERS,
        });
    }
}

export default callApi;
