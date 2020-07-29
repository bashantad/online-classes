import baseApi from "./baseApi";
import reviewApi from './reviewApi';

const courseApi = {
	getById: (id) => {
		return baseApi.get(`/courses/${id}`);
	},
	getApprovedCourses: () => {
		return baseApi.get('/courses');
	},
	getEnrolledCourses: () => {
		return baseApi.get('/courses/enrolled');
	},
	getConversationDetails: (id) => {
		return baseApi.get(`/courses/${id}/conversation_details`);
	},
	sendEnrollmentRequest: (id, body) => {
		return baseApi.post(`/courses/${id}/enrollment_request`, body);
	},
	reviews: (id) => {
		return reviewApi({reviewable_type: 'course',  reviewable_id: id});
	}
}

export default courseApi;
