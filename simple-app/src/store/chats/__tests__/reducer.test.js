import { chatReducer } from '../reducer'
import { addChat, deleteChat, setChats } from '../actions'
describe('chats reducer tests', () => {
    it('should return the initial state', () => {
        const initialState = {
            chats: []
        }
        const received = chatReducer(undefined, {});

        expect(received).toEqual(initialState);
    });

    it('add chat', () => {
        const chatName = "test";
        const initialState = {
            chats: []
        }
        const expected = {
            chats: [
                {
                    id: `chat-1`,
                    name: chatName
                }
            ]
        };
        const received = chatReducer(initialState, addChat(chatName));
        expect(received).toEqual(expected);
    });

    it('delete chat', () => {
        const id = "chat-1";
        const initialState = {
            chats: [
                {
                    id: "chat-1",
                    name: "chat1"
                },
                {
                    id: "chat-2",
                    name: "chat2"
                },
                {
                    id: "chat-3",
                    name: "chat3"
                }
            ]
        }
        const expected = {
            chats: [
                {
                    id: "chat-2",
                    name: "chat2"
                },
                {
                    id: "chat-3",
                    name: "chat3"
                }
            ]
        };
        const received = chatReducer(initialState, deleteChat(id));
        expect(received).toEqual(expected);
    });

    it('set chat', () => {
        const initialState = {
            chats: []
        }
        const expected = {
            chats: [
                {
                    id: `chat-1`,
                    name: "chat1"
                }
            ]
        };
        const received = chatReducer(initialState, setChats(
            [
                {
                    id: `chat-1`,
                    name: "chat1"
                }
            ]
        ));
        expect(received).toEqual(expected);
    });

});

