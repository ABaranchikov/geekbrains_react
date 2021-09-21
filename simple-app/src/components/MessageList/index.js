import React from 'react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../Message'
import { Card } from 'react-bootstrap';
import { selectMessages } from '../../store/messages/selectors';
import { addMessage } from '../../store/messages/actions';
import { FormChat } from '../Form';
import { AUTHORS } from '../../utils/constants'
import { getCurrentDate } from '../../utils/dateUtils'


export const MessageList = ({ chatId, chatExists }) => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);

    const sendMessage = useCallback((text, author, date) => {
        dispatch(addMessage(chatId, text, author, date))
    }, [chatId, dispatch]);

    useEffect(() => {
        let timeout;
        const currentMessage = messages[chatId];
        if (!!chatId && currentMessage?.[currentMessage.length - 1]?.author === AUTHORS.HUMAN) {
            timeout = setTimeout(() => {
                sendMessage(
                    'I\'m a bot',
                    AUTHORS.BOT,
                    getCurrentDate()
                )
            }, 1000);
        }
        return () => clearTimeout(timeout);
    }, [messages]);

    const handleAddMessage = useCallback(
        (text) => {
            sendMessage(
                text,
                AUTHORS.HUMAN,
                getCurrentDate()
            )
        }, [chatId, sendMessage]);

    return (
        <Card className="m-0 p-0">
            {!!chatId && chatExists && (
                <>
                    <Card.Header className="ContentProfile d-flex flex-row justify-content-start align-items-center">
                        <p className="ContactProfileTxt m-0 p-0">{chatExists.name}</p>
                    </Card.Header>
                    <Card.Body className="Messages">
                        <div className="Scrollable">
                            {(messages[chatId] || []).map((message) => (<Message key={message.id} message={message} />))}
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <FormChat onSubmit={handleAddMessage} />
                    </Card.Footer>
                </>
            )}
        </Card>

    )
}