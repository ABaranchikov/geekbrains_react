import { ref, onValue, set, remove } from "firebase/database";
import { db } from "../../services/firebase";
import { AUTHORS } from "../../utils/constants";
import { getCurrentDate } from '../../utils/dateUtils';

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const SET_MESSAGES = "MESSAGES::SET_MESSAGES";


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


const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
});

let timeout;

export const initMessages = () => (dispatch) => {
    const messagesDbRef = ref(db, 'messages');
    onValue(messagesDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setMessages(data || {}));
    });
}

export const addMessageFb = (text, author, date, chatId) => () => {
    addNewMesage(text, author, date, chatId);
    if (author === AUTHORS.HUMAN) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            addNewMesage("I'm a bot", AUTHORS.BOT, getCurrentDate(), chatId);
        }, 1000);
    }
}

export const deleteMessageFb = (chatId, id) => () => {
    const messagesDbRef = ref(db, `messages/${chatId}/${id}`);
    remove(messagesDbRef);
}

const addNewMesage = (text, author, date, chatId) => {
    const newId = `message-${Date.now()}`;
    const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
    set(messagesDbRef, {
        author: author,
        text: text,
        date: date,
        id: newId,
    });
}