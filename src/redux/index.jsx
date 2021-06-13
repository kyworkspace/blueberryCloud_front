import {combineReducers} from 'redux'
import Customizer from './customizer/reducer'
import user from './user/_reducers/user_reducer';
import folder from './folder/_reducers/folder_reducer'
import notice from './notice/_reducers/notice_reducer';
const reducers = combineReducers({
    Customizer,
    user,
    folder,
    notice
});

export default reducers;