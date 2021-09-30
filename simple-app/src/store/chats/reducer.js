import { ADD_CHAT, DELETE_CHAT, SET_CHATS } from './actions'

const initialState = {
    chats: []
}

export const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CHAT: {
            let id = 1;
            if (state.chats.length > 0) {            
                id = +(state.chats[state.chats.length - 1].id).substring(5) + 1;        
            }
            return {
                ...state,
                chats: [...state.chats, { id: `chat-${id}`, name: payload }]
            }
        }
        case DELETE_CHAT: {
            const newChats = state.chats.filter(({ id }) => id !== payload);
            return {
                ...state,
                chats: newChats
            }
        }
        case SET_CHATS: {
            return {
                ...state,
                chats: payload,
            }
        }
        default:
            return state;
    }
}