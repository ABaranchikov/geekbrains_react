import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { profileReducer } from './profile/reducer';
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import watchAddMessage from './messages/saga'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middleWares = [thunk, sagaMiddleware];

const persistConfig = {
    key: 'gb1809',
    storage,
    blacklist: ['messages']
}

const rootReducer = combineReducers({
    profile: profileReducer,
    chat: chatReducer,
    messages: messagesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleWares))
);

// Then run the saga
sagaMiddleware.run(watchAddMessage)

export const persistor = persistStore(store);