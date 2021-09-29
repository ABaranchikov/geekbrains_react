import { put, call, takeLatest } from 'redux-saga/effects'
import { API_MEMES, LIMIT } from '../../utils/constants';
import { getMemesLoading, getMemesFail, getMemesSuccess, GET_MEMES } from './actions';

// Worker saga will be fired on ADD_MESSAGE actions
function* getNewMemes({ payload }) {
    try {
        yield put(getMemesLoading());
        const result = yield call(() => {
            return fetch(API_MEMES(payload.page * LIMIT, LIMIT))
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}`);
                    }
                    return response.json();
                })
        });
        yield put(getMemesSuccess(result.data));
    } catch (e) {
        yield put(getMemesFail(e.message));
    }
}

// Starts addBotMessage on each dispatched ADD_MESSAGE action
export default function* watchGetMemes() {
    yield takeLatest(GET_MEMES, getNewMemes);
}