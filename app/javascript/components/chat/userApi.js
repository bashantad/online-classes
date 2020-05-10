import {HEADERS, API_ROOT} from '../../constants';

const userApi = {
	getCurrentUserInfo: () => {
		return fetch(`${API_ROOT}/users/current_user_info`, {
			method: 'GET',
			headers: HEADERS
		});
	},
	markMessagesRead: (conversationId) => {
		fetch(`${API_ROOT}/users/${conversationId}/mark_messages_read`, {
			method: 'GET',
			headers: HEADERS
		});
	}
}

export default userApi;
