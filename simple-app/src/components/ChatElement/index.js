import React from 'react';
import { ListGroup } from 'react-bootstrap'
import './Chat.css';

export const ChatElement = (props) => {
  return (
    <ListGroup.Item action className="d-flex flex-row justify-content-start align-items-center">
      <img className="ContactImg" src={props.chat.img} alt="" />
      <p className="ContactName"> {props.chat.name} </p>
     
    </ListGroup.Item>
  )
}