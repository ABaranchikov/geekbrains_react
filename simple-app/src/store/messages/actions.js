import { getCurrentDate } from "../../utils/dateUtils";
import { AUTHORS } from '../../utils/constants'

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";


export const addMessage = (chatId, text, author, date) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author,
        date
    },
});

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        id
    },
});

let timeout;
/*
//redux-thunk example

export const addMessageWithReply = (chatId, text, author, date) => (dispatch) => {
    dispatch(addMessage(chatId, text, author, date));
    if (author === AUTHORS.HUMAN) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dispatch(addMessage(chatId, 'I\'m a bot', AUTHORS.BOT, getCurrentDate()));
        }, 1000);
    }
}
*/