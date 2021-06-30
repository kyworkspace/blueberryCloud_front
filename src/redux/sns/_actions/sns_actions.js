import axios from 'axios';
import { LIKE_API, SNS_API } from '../../../route/Apis';
import { GET_ALL_LIKE_COUNT } from './types';

export function getAllLikeCount() {
    const request = axios.post(`${LIKE_API}/like/all/count`).then(res => res.data);
    return {
        type: GET_ALL_LIKE_COUNT,
        payload: request,
    }
}