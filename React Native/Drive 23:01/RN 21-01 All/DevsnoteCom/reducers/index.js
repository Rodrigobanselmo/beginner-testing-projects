import { combineReducers } from 'redux';
import NotesReducer from './NotesReducer';
import PastasReducer from './PastasReducer';

export default combineReducers({
    notes: NotesReducer,
    pastas: PastasReducer
});
