import { put, takeEvery, call } from 'redux-saga/effects'
import { getCurrentDate } from "../../utils/dateUtils";
import { AUTHORS } from '../../utils/constants'
import { ADD_MESSAGE, addMessage } from './actions'

const delay = time => new Promise(resolve => setTimeout(resolve, time));

// Worker saga will be fired on ADD_MESSAGE actions
function* addBotMessage({payload}) {
    if (payload.author === AUTHORS.HUMAN) {
        yield call(delay, 1000);
        yield put(addMessage(payload.chatId, 'I\'m a bot', AUTHORS.BOT, getCurrentDate()))
    }
}

// Starts addBotMessage on each dispatched ADD_MESSAGE action
export default function* watchAddMessage() {
    yield takeEvery(ADD_MESSAGE, addBotMessage);
}