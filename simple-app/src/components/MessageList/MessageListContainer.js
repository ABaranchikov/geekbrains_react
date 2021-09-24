import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessageListView } from './MessageListView';
import { selectMessages } from '../../store/messages/selectors';
import { addMessage, deleteMessage } from '../../store/messages/actions';
import { AUTHORS } from '../../utils/constants';
import { getCurrentDate } from '../../utils/dateUtils';
import { db } from '../../services/firebase';
import { onValue, ref, set } from '@firebase/database';

export const MessageList = ({ chatId }) => {
    console.log("chatId = " + chatId);
    const dispatch = useDispatch();
    //  const messages = useSelector(selectMessages);

    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    const unsubscribeMessages = useRef(null);

    useEffect(() => {
        const chatsDbRef = ref(db, "chats");
        onValue(chatsDbRef, (snapshot) => {
            const data = snapshot.val();
            console.log('-------', data);
            setChats(Object.values(data || {}));
        })
    }, []);

    useEffect(() => {
        if (unsubscribeMessages.current) {
            unsubscribeMessages.current();
        }

        const messagesDbRef = ref(db, `messages/${chatId}`);
        const unsubscribe = onValue(messagesDbRef, (snapshot) => {
            const data = snapshot.val();
            console.log('-------', data);
            setMessages(Object.values(data || {}));
        });

        unsubscribeMessages.current = unsubscribe;

        return () => unsubscribe();
    }, [chatId])


    const sendMessage = useCallback((text, author, date) => {
        const newId = `message-${Date.now()}`;
        const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
        set(messagesDbRef, {
            text,
            author,
            date,
            id: newId
        })
    }, [chatId]);

    const chatExists = useMemo(() => chats.find((chat) => chat.id === chatId), [chatId, chats]);

    const sendMessage2 = useCallback((text, author, date) => {
        // dispatch(addMessageWithReply(chatId, text, author, date))
        dispatch(addMessage(chatId, text, author, date))
    }, [dispatch, chatId]);

    const handleAddMessage = useCallback(
        (text) => {
            sendMessage(
                text,
                AUTHORS.HUMAN,
                getCurrentDate()
            )
        }, [sendMessage]);

    const handleDeleteMessage = useCallback((id) => {
        dispatch(deleteMessage(chatId, id));
    }, [dispatch, chatId]);

    return (
        <MessageListView chatId={chatId} messages={messages} chatExists={chatExists} onAddMessage={handleAddMessage} onDeleteMessage={handleDeleteMessage} />
    )
}