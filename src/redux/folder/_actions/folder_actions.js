import axios from 'axios';
import { CLOUD_API } from '../../../route/Apis';
import {
    SET_FOLDER_ROUTE
} from './types';

export function setFolderRoute(path) {

    return {
        type: SET_FOLDER_ROUTE,
        payload: path
    }
}