import baseApi from "./baseApi";

const userApi = {
	getCurrentUserInfo: () => {
		return baseApi.get('/users/current_user_info');
	},
	markMessagesRead: (conversationId) => {
		return baseApi.get(`/users/${conversationId}/mark_messages_read`);
	}
}

export default userApi;
