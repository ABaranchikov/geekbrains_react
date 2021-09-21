import { createStore, combineReducers } from 'redux'

import { profileReducer } from './profile/reducer';
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    chat: chatReducer,
    messages: messagesReducer
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
