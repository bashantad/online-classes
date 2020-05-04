import {HEADERS, API_ROOT} from '../../constants';

const conversationApi = {
	getAll: () => {
		return fetch(`${API_ROOT}/conversations`, {
			method: 'GET',
			headers: HEADERS
		});
	},
	create: (conversation) => {
		fetch(`${API_ROOT}/conversations`, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(conversation)
		});
	}
}

export default conversationApi;
