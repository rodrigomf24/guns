import { LOGIN, LOGOUT } from '../constants';

const initialState = {
    authToken:void(0),
    loginStatus:false,
    userId:void(0),
    user:void(0)
};

export default function update(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {authToken:action.payload.token, loginStatus:action.payload.status, userId:action.payload.id, user:action.payload.userInfo});
        case LOGOUT:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
};