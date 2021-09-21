import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BsTrash as Trash } from 'react-icons/bs';
import './Chat.css';

export const ChatListView = ({ chats, onDelete }) => (
    <>
        <ListGroup className="ChatList">
            {chats.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex  justify-content-between align-items-center">
                    <Link to={`/chats/${item.id}`} className="ChatLink d-flex justify-content-start align-items-center">
                        <p className="ContactName m-0"> {item.name} </p>
                    </Link>
                    <Button className="DeleteBtn" onClick={() => onDelete(item.id)}><Trash /></Button>
                </ListGroup.Item>

            ))}
        </ListGroup>
    </>
)
