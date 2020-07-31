import baseApi from "./baseApi";

const chatApi = {
	create: (conversationId, message) => {
		const body = {
			content: message,
		};
		return baseApi.post(`/conversations/${conversationId}/messages`, body);
	}
}

export default chatApi;
