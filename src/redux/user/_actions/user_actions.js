import axios from 'axios';
import { USER_API } from '../../../route/Apis';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_USER,
    PASSWORD_UPDATE,
    PASSWORD_RESET
} from './types';


export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_API}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_API}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_API}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_API}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function updateUserProfile(body) {
    return {
        type: UPDATE_USER,
        payload: body
    }
}
export function setPasswordUpdate(body) {
    const request = axios.post(`${USER_API}/password/update`, body).then(res => res.data);
    return {
        type: PASSWORD_UPDATE,
        payload: request
    }
}
export function setPasswordReset(body) {
    const request = axios.post(`${USER_API}/password/reset`, body).then(res => res.data);
    return {
        type: PASSWORD_RESET,
        payload: request
    }
}