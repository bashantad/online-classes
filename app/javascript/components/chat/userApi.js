import {HEADERS, API_ROOT} from '../../constants';

const userApi = {
	getCurrentUserState: () => {
		return fetch(`${API_ROOT}/users/current_user_state`, {
			method: 'GET',
			headers: HEADERS
		});
	},
}

export default userApi;
