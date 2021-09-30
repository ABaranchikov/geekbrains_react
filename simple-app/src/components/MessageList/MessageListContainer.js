import React, {useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageListView } from './MessageListView';
import { selectMessages } from '../../store/messages/selectors';
import { addMessageFb, deleteMessageFb } from '../../store/messages/actions';
import { AUTHORS } from '../../utils/constants';
import { getCurrentDate } from '../../utils/dateUtils';

export const MessageList = ({ chatId, chatExists }) => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);

    const sendMessage = useCallback(
        (text, author, date) => {
            dispatch(addMessageFb(text, author, date, chatId));
        },
        [chatId]
    );

    const handleAddMessage = useCallback(
        (text) => {
            sendMessage(text, AUTHORS.HUMAN, getCurrentDate());
        },
        [sendMessage]
    );

    const handleDeleteMessage = useCallback((id) => {
        dispatch(deleteMessageFb(chatId, id));
    }, [dispatch, chatId]);



    return (
        <MessageListView chatId={chatId} messages={messages} chatExists={chatExists} onAddMessage={handleAddMessage} onDeleteMessage={handleDeleteMessage} />
    )
}