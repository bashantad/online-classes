import baseApi from "./baseApi";

const conversationApi = {
	getAllByCourseId: (courseId) => {
		return baseApi.get(`/courses/${courseId}/conversations`);
	},
	getMessages: (courseId, conversationId) => {
		return baseApi.get(`/courses/${courseId}/conversations/${conversationId}/messages`);
	},
	create: (courseId, otherUserId) => {
		const body = {
			other_user_id: otherUserId
		};
		return baseApi.post(`/courses/${courseId}/conversations`, body);
	},

	createGroup: (courseId, title) => {
		const body = {
			title: title
		};
		return baseApi.post(`/courses/${courseId}/conversations/create_group`, body);
	},

	updateMembers: (courseId, conversationId, userIds) => {
		const body = {
			user_ids: userIds
		};
		return baseApi.post(`/courses/${courseId}/conversations/${conversationId}/update_members`, body);
	}
}

export default conversationApi;
