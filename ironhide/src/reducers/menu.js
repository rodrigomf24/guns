import { OPEN_MENU, CLOSE_MENU } from '../constants';

const initialState = {
    opened:false
};

export default function update(state = initialState, action) {
    switch(action.type) {
        case OPEN_MENU:
            return Object.assign({}, state, {opened:action.open});
        case CLOSE_MENU:
            return Object.assign({}, state, {opened:action.open});
        default:
            return state;
    }
};