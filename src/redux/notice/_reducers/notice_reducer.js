import { SET_NOTICE_DETAIL } from '../_actions/types'

export default function (state = { show: false }, action) {
    switch (action.type) {
        case SET_NOTICE_DETAIL:
            return { show: action.show, ...action.payload }
        default:
            return state
    }
}