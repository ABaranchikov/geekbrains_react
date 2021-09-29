import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk";
import { profileReducer } from './profile/reducer';
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { memesReducer } from './memes/reducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import watchGetMemes from './memes/saga'; 

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware, thunk]
const persistConfig = {
    key: 'gb1809',
    storage,
    blacklist: ['messages', 'memes', 'profile']
}

const rootReducer = combineReducers({
    profile: profileReducer,
    chat: chatReducer,
    messages: messagesReducer,
    memes:memesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleWares))
);

// Then run the saga
sagaMiddleware.run(watchGetMemes)

export const persistor = persistStore(store);