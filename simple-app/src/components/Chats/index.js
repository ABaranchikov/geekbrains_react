import { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { ChatList } from '../ChatList/ChatListContainer';

import { selectIfChatExists } from '../../store/chats/selectors';
import { MessageList } from '../MessageList/MessageListContainer';


export const Chats = () => {
    const { chatId } = useParams();
    const selectChatExists = useMemo(() => selectIfChatExists(chatId), [chatId]);
    const chatExists = useSelector(selectChatExists);

    if (!!chatId && !chatExists) {
        return <Redirect to="/chats" />;
    }

    return (
        <div className="App m-0 d-flex justify-content-center align-items-center">
            <Container fluid="md" className="Container p-0 m-0">
                <Row className="h-100 m-0 p-0">
                    <Col md={4} className="SidePanel m-0 p-0">
                        <ChatList />
                    </Col>
                    <Col md={8} className="Content m-0 p-0">
                        <MessageList chatId={chatId} chatExists={chatExists} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}