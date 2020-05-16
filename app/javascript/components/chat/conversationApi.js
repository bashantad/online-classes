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
	},

	createGroup: (courseId, title) => {
		const body = {
			title: title
		};
		return fetch(`${API_ROOT}/courses/${courseId}/conversations/create_group`, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(body)
		});
	},

	updateMembers: (courseId, conversationId, userIds) => {
		const body = {
			user_ids: userIds
		};
		return fetch(`${API_ROOT}/courses/${courseId}/conversations/${conversationId}/update_members`, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(body)
		});
	}
}

export default conversationApi;
