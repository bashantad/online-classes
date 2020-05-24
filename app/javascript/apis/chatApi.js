import {HEADERS, API_ROOT} from '../constants';

const chatApi = {
	create: (conversationId, message) => {
		const body = {
			content: message,
		};

		fetch(`${API_ROOT}/conversations/${conversationId}/messages`, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(body)
		});
	}
}

export default chatApi;
