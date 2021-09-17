import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap'
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../../store/chats/actions'
import { selectChats } from '../../store/chats/selectors';
import { Link } from 'react-router-dom';
import { BsTrash as Trash } from 'react-icons/bs';
import './Chat.css';

export const ChatList = () => {
  const [value, setValue] = useState("");
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      handleAddChat(value);
    }
    setValue("");
  }

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleAddChat = useCallback((name) => {
    dispatch(addChat(name));
  }, [dispatch]);

  const handleDeleteChat = useCallback((id) => {
    dispatch(deleteChat(id));
  }, [dispatch]);

  return (
    <div>
      <ListGroup className="ChatList">
        {chats.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex  justify-content-between align-items-center">
            <Link to={`/chats/${item.id}`} className="ChatLink d-flex justify-content-start align-items-center">
              <p className="ContactName m-0"> {item.name} </p>
            </Link>
            <Button className="DeleteBtn" onClick={() => handleDeleteChat(item.id)}><Trash /></Button>
          </ListGroup.Item>

        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="FormChat">
          <Form.Control type="text" value={value} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" className="FormChatBtn" type="submit">
          Добавить чат
        </Button>
      </Form>
    </div>
  )
}