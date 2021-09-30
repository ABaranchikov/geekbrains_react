import React from 'react';
import { Card } from 'react-bootstrap';
import { FormChat } from '../Form';
import { Message } from '../Message'


export const MessageListView = ({ chatId, messages, chatExists, onAddMessage, onDeleteMessage }) => {
    return (
        <Card className="m-0 p-0">
            {!!chatId && chatExists && (
                <>
                    <Card.Header className="ContentProfile d-flex flex-row justify-content-start align-items-center">
                        <p className="ContactProfileTxt m-0 p-0">{chatExists.name}</p>
                    </Card.Header>
                    <Card.Body className="Messages">
                        <div className="Scrollable">
                            {(Object.values(messages[chatId] || {}) || []).map((message) => (<Message key={message.id} message={message} onDeleteMessage={onDeleteMessage} />))}
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <FormChat onSubmit={onAddMessage} />
                    </Card.Footer>
                </>
            )}
        </Card>
    )
}
