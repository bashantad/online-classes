import {HEADERS, API_ROOT} from '../constants';

const reviewApi = (params) => {
	const _mergedUrl = (url) => {
		return `${url}?reviewable_type=${params['reviewable_type']}&reviewable_id=${params['reviewable_id']}`;
	}
	return {
		create: (body) => {
			const createUrl = _mergedUrl(`${API_ROOT}/reviews`);
			return fetch(createUrl, {
				method: "POST",
				headers: HEADERS,
				body: JSON.stringify({review: body})
			});
		},
		getById: (id) => {
			const getUrl = _mergedUrl(`${API_ROOT}/reviews/${id}`);
			return fetch(getUrl, {
				method: "GET",
				headers: HEADERS,
			});
		},
		update: (id, body) => {
			const updateUrl = _mergedUrl(`${API_ROOT}/reviews/${id}`);
			return fetch(updateUrl, {
				method: "POST",
				headers: HEADERS,
				body: JSON.stringify({review: body})
			});
		},
		destroy: (id) => {
			const deleteUrl = _mergedUrl(`${API_ROOT}/reviews/${id}`);
			return fetch(deleteUrl, {
				method: "DELETE",
				headers: HEADERS,
			});
		},
	}
}

export default reviewApi;
