import {HEADERS, API_ROOT} from '../../constants';
const createUrl = `${API_ROOT}/messages`;
const chatApi = {
	create: (message) => {
		fetch(createUrl, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(message)
		});
	}
}

export default chatApi;
