import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageListView } from './MessageListView';
import { selectMessages } from '../../store/messages/selectors';
import { addMessage, deleteMessage } from '../../store/messages/actions';
import { AUTHORS } from '../../utils/constants';
import { getCurrentDate } from '../../utils/dateUtils';

export const MessageList = ({ chatId, chatExists }) => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);

    const sendMessage = useCallback((text, author, date) => {
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