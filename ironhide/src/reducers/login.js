import { SET_EMAIL, SET_PASSWORD } from '../constants';

const initialState = {
    email:void(0),
    password:void(0)
};

export default function update(state = initialState, action) {
    switch(action.type) {
        case SET_EMAIL:
            return Object.assign({}, state, {email:action.email});
        case SET_PASSWORD:
            return Object.assign({}, state, {password:action.password});
        default:
            return state;
    }
};