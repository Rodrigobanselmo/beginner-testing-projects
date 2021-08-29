import { combineReducers } from 'redux';
import NotesReducer from './NotesReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    notes: NotesReducer, 
    user: UserReducer
});
