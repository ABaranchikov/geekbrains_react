import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { profileReducer } from './profile/reducer';
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { memesReducer } from './memes/reducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootSaga from './rootsaga'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'gb1809',
    storage,
    blacklist: ['messages', 'memes']
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
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Then run the saga
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);