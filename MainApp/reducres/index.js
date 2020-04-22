import {combineReducers} from 'redux';

import Nav from './navReducers';

const AppReducers=combineReducers({
    nav:Nav
});
 
export default AppReducers;