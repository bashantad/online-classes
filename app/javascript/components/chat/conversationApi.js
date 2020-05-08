import {HEADERS, API_ROOT} from '../../constants';

const conversationApi = {
	create: (courseId, otherUserId) => {
		const body = {
			other_user_id: otherUserId
		};
		return fetch(`${API_ROOT}/courses/${courseId}/conversations`, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(body)
		});
	}
}

export default conversationApi;
