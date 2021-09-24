import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../../store/chats/actions'
import { selectChats } from '../../store/chats/selectors';
import './Chat.css';
import { ChatListView } from './ChatListView';
import { ChatsForm } from '../ChatsForm';
import { db } from '../../services/firebase';
import { onValue, ref, set } from '@firebase/database';

export const ChatList = () => {
    const [chats, setChats] = useState([]);
    
   // const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    useEffect(() => {
        const chatsDbRef = ref(db, "chats");
        onValue(chatsDbRef, (snapshot) => {
            const data = snapshot.val();
            console.log('-------', data);
            setChats(Object.values(data || {}));
        })
    },[])

    const handleAddChat = (name) => {
        const newId = `chat-${Date.now()}`;
        const chatsDbRef = ref(db, `chats/${newId}`);
        set(chatsDbRef, {
            id: newId,
            name: name
        });
    }
 
    const handleAddChat2 = useCallback((name) => {
        dispatch(addChat(name))
    }, [dispatch]);

    const handleDeleteChat = useCallback((id) => {
        dispatch(deleteChat(id));
    }, [dispatch]);

    return (
        <div>
            <ChatListView chats={chats} onDelete={handleDeleteChat} />
            <ChatsForm onAddChat={handleAddChat} />
        </div>
    )
}