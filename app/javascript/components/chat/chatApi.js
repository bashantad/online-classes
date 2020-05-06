import {HEADERS, API_ROOT} from '../../constants';

const chatApi = {
	create: (message) => {
		fetch(`${API_ROOT}/messages`, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(message)
		});
	}
}

export default chatApi;
