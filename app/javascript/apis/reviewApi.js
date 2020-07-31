import baseApi from "./baseApi";

const reviewApi = (params) => {
	const _mergedUrl = (url) => {
		return `${url}?reviewable_type=${params['reviewable_type']}&reviewable_id=${params['reviewable_id']}`;
	}
	return {
		create: (body) => {
			const createUrl = _mergedUrl(`/reviews`);
			return baseApi.post(createUrl, {review: body});
		},
		getById: (id) => {
			const getUrl = _mergedUrl(`/reviews/${id}`);
			return baseApi.get(getUrl);
		},
		update: (id, body) => {
			const updateUrl = _mergedUrl(`/reviews/${id}`);
			return baseApi.post(updateUrl, {review: body});
		},
		destroy: (id) => {
			const deleteUrl = _mergedUrl(`/reviews/${id}`);
			return baseApi.delete(deleteUrl);
		},
	}
}

export default reviewApi;
