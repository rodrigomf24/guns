import { LOGIN, LOGOUT } from '../constants';

const initialState = {
    authToken:void(0),
    loginStatus:false,
    userId:void(0)
};

export default function update(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {authToken:action.token, loginStatus:action.status, userId:action.id});
        case LOGOUT:
            return Object.assign({}, state, {authToken:action.token, loginStatus:action.status, userId:action.id});
        default:
            return state;
    }
};