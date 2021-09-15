import { useEffect, useState, useCallback } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Message } from '../Message';
import { ChatList } from '../ChatList';
import { FormChat } from '../Form';
import { AUTHORS } from '../../utils/constants'
import { getCurrentDate } from '../../utils/dateUtils'

const chatList = [
    { id: "chat1", name: "Louis Litt", img: "http://emilcarlsson.se/assets/louislitt.png" },
    { id: "chat2", name: "Harvey Specter", img: "http://emilcarlsson.se/assets/harveyspecter.png" },
    { id: "chat3", name: "Rachel Zane", img: "http://emilcarlsson.se/assets/rachelzane.png" },
    { id: "chat4", name: "Donna Paulsen", img: "http://emilcarlsson.se/assets/donnapaulsen.png" },
    { id: "chat5", name: "Jessica Pearson", img: "http://emilcarlsson.se/assets/jessicapearson.png" },
];

const initMessages = {
    'chat1': [
        { id: 'mess-1', text: 'Start chat with Louis Litt', author: AUTHORS.HUMAN, date: getCurrentDate() },
        { id: 'mess-2', text: 'Bot message', author: AUTHORS.BOT, date: getCurrentDate() }
    ],
    'chat2': [
        { id: 'mess-3', text: 'Start chat with Harvey Specter', author: AUTHORS.HUMAN, date: getCurrentDate() }
    ],
    'chat3': [
        { id: 'mess-4', text: 'Start chat with Rachel Zane', author: AUTHORS.HUMAN, date: getCurrentDate() }
    ],
    'chat4': [
        { id: 'mess-5', text: 'Start chat with Donna Paulsen', author: AUTHORS.HUMAN, date: getCurrentDate() }
    ],
    'chat5': [
        { id: 'mess-6', text: 'Start chat with Jessica Pearson', author: AUTHORS.HUMAN, date: getCurrentDate() }
    ],
}

export const Chats = () => {

    const { chatId } = useParams();
    const [chats, setChatList] = useState(chatList);
    const [messageList, setMessages] = useState(initMessages);

    const sendMessage = useCallback((message) => {
        setMessages(prevMess => ({
            ...prevMess,
            [chatId]: [
                ...prevMess[chatId],
                message
            ],
        }))
    }, [chatId]);

    useEffect(() => {
        let timeout;
        const currentMessage = messageList[chatId];
        if (!!chatId && !!messageList[chatId] && currentMessage[currentMessage.length - 1]?.author === AUTHORS.HUMAN) {
            timeout = setTimeout(() => {
                sendMessage({
                    id: `mess-${Date.now()}`,
                    text: 'I\'m a bot',
                    author: AUTHORS.BOT,
                    date: getCurrentDate()
                })
            }, 1000);
        }
        return () => clearTimeout(timeout);
    }, [messageList]);

    const handleAddMessage = useCallback(
        (text) => {
            sendMessage({
                id: `mess-${Date.now()}`,
                text: text,
                author: AUTHORS.HUMAN,
                date: getCurrentDate()
            })
        }, [chatId, sendMessage]);

    const handleAddChat = useCallback((name) => {
        let id = 0;
        if (chats.length !== 0) {
            id = +chats[chats.length - 1].id.substring(4) + 1;
        }
        setChatList((prevChat) => [...prevChat, { id: `chat${id}`, name, img: "" }]);
        setMessages(prevMess => ({
            ...prevMess,
            [`chat${id}`]: [],
        }))

    }, [chats]);

    const handleDeleteChat = useCallback((id) => {
        const newChat = chats.filter(chat => chat.id !== id);
        setChatList(newChat);
        const { [id]: tmp, ...rest } = messageList;
        setMessages(rest);
    }, [messageList, chats]);

    const getCurrentChat = useCallback(() => {
        return chats.find(chat => chat.id === chatId);
    }, [chatId])

    if (!!chatId && !messageList[chatId]) {
        return <Redirect to="/chats" />;
    }

    return (
        <div className="App m-0 d-flex justify-content-center align-items-center">
            <Container fluid="md" className="Container p-0 m-0">
                <Row className="h-100 m-0 p-0">
                    <Col md={4} className="SidePanel m-0 p-0">
                        <ChatList chats={chats} onAddChat={handleAddChat} onDeleteChat={handleDeleteChat} />
                    </Col>
                    <Col md={8} className="Content m-0 p-0">
                        <Card className="m-0 p-0">
                            {!!chatId && (
                                <>
                                    <Card.Header className="ContentProfile d-flex flex-row justify-content-start align-items-center">
                                        <img className="ContactProfileImg" src={getCurrentChat().img} alt="" />
                                        <p className="ContactProfileTxt m-0 p-0">{getCurrentChat().name}</p>
                                    </Card.Header>
                                    <Card.Body className="Messages">
                                        <div className="Scrollable">
                                            {messageList[chatId].map((message) => (<Message key={message.id} message={message} imgSrc={getCurrentChat(chatId).img} />))}
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <FormChat onSubmit={handleAddMessage} />
                                    </Card.Footer>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}