export const GET_USER_INFO_REQUEST = 'CHAT/GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'CHAT/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'CHAT/GET_USER_INFO_FAILURE';

export const initialUserState = {
    fullName: null,
    currentUserId: null,
    enrolledCourses: [],
    individualConversations: [],
    conversations: [],
    messageNotificationMap: [],
    fetching: false,
    error: false,
};

export const userInfoReducer = (state= initialUserState, action) => {
    switch(action.type) {
        case GET_USER_INFO_REQUEST:
            return {...state, fetching: true};
        case GET_USER_INFO_SUCCESS:
            return {...state, fetching: false}; //TODO fix this to retain the data from the backend.
        case GET_USER_INFO_FAILURE:
            return {...state, error: true, fetching: false};
        default:
            return state;
    }
};
