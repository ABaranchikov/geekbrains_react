import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatFb, deleteChatFb } from '../../store/chats/actions'
import { selectChats } from '../../store/chats/selectors';
import './Chat.css';
import { ChatListView } from './ChatListView';
import { ChatsForm } from '../ChatsForm';


export const ChatList = () => {
    const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const handleAddChat = (name) => {
        dispatch(addChatFb(name))
    }

    const handleDeleteChat = useCallback((id) => {
        dispatch(deleteChatFb(id));
    }, [dispatch]);

    return (
        <div>
            <ChatListView chats={chats} onDelete={handleDeleteChat} />
            <ChatsForm onAddChat={handleAddChat} />
        </div>
    )
    
}