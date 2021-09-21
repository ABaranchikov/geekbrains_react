import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteMessage } from '../../store/messages/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { AUTHORS } from '../../utils/constants';
import { BsTrash as Trash } from 'react-icons/bs';
import './Message.scss';

export const Message = ({ message }) => {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const handleDeleteMessage = useCallback((id) => {
    dispatch(deleteMessage(chatId, id));
  }, [dispatch]);


  return (
    <div className={`d-flex ${message.author === AUTHORS.HUMAN ? 'justify-content-start ' : 'justify-content-end '} m-0 p-0 mb-4`}>
      <div className={`MessageContainer ${message.author === AUTHORS.HUMAN ? 'SendTxt' : 'RepliesTxt'}`} >
        <div className = "d-flex justify-content-between">
          <p className="MessageTxt"> {message.text}</p>
          <Button className={`DeleteBtn ${message.author === AUTHORS.HUMAN ? 'SendTxt' : 'RepliesTxt'}`} onClick={() => handleDeleteMessage(message.id)}><Trash /></Button>
        </div>
        <span className={`MessageDate ${message.author === AUTHORS.HUMAN ? 'MessageDateSend' : ''}`}>{message.date}</span>
      </div>
    </div>
  )
}