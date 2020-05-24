import { combineReducers } from 'redux';
import {userInfoReducer} from "./pages/chat/chatReducer";

export default combineReducers({
    userInfo: userInfoReducer
});
