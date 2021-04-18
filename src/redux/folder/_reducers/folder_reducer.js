import {
    SET_FOLDER_ROUTE
} from '../_actions/types';


export default function (state = { path: "ALL" }, action) {
    switch (action.type) {
        case SET_FOLDER_ROUTE:
            return { ...state, path: action.payload }
        default:
            return state;
    }
}