import {combineReducers} from 'redux'
import Customizer from './customizer/reducer'
import user from './user/_reducers/user_reducer';
const reducers = combineReducers({
    Customizer,
    user
});

export default reducers;