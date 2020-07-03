import {HEADERS, API_ROOT} from '../constants';

const courseApi = {
	getById: (id) => {
		return fetch(`${API_ROOT}/courses/${id}`, {
			method: 'GET',
			headers: HEADERS
		});
	},
	getApprovedCourses: () => {
		return fetch(`${API_ROOT}/courses`, {
			method: 'GET',
			headers: HEADERS
		});
	}
}

export default courseApi;
