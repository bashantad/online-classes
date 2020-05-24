import {HEADERS, API_ROOT} from '../constants';

const callApi = {
    broadcast: (conversationId, data) => {
        fetch(`${API_ROOT}/conversations/${conversationId}/calls`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data)
        });
    }
}

export default callApi;
