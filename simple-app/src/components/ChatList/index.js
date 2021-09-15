import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap'
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash as Trash } from 'react-icons/bs';
import './Chat.css';

export const ChatList = ({ chats, onAddChat, onDeleteChat }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      onAddChat(value);
    }
    setValue("");
  }

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const deleteChat = (id) => {
    onDeleteChat(id)
  };

  return (
    <div>
      <ListGroup className="ChatList">
        {chats.map((item) => (

          <ListGroup.Item key={item.id} className="d-flex  justify-content-between align-items-center">
            <Link to={`/chats/${item.id}`} className="ChatLink d-flex justify-content-start align-items-center">
              <img className="ContactImg" src={item.img} alt="" />
              <p className="ContactName m-0"> {item.name} </p>
            </Link>
            <Button className="DeleteBtn" onClick={() => deleteChat(item.id)}><Trash /></Button>
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