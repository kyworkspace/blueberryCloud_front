import { SET_NOTICE_DETAIL } from './types'


export function setNoticeDetailModal(data) {

    return {
        type: SET_NOTICE_DETAIL,
        payload: data
    }

}
