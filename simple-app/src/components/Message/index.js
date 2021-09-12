import React from 'react';
import './Message.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import chatbot from '../../img/chatbot.jpg';
import { AUTHORS } from '../../utils/constants';

export const Message = ({message, imgSrc}) => {
  return (
    <div className={`d-flex ${message.author === AUTHORS.HUMAN ? 'justify-content-start ' : 'justify-content-end '} m-0 p-0 mb-4`}>
      {message.author === AUTHORS.HUMAN && <img className="MessageImg" src={imgSrc} alt="" />}
      <div className={`MessageContainer ${message.author === AUTHORS.HUMAN ? 'SendTxt' : 'RepliesTxt'}`} >
        <p className="MessageTxt"> {message.text}</p>
        <span className={`MessageDate ${message.author === AUTHORS.HUMAN ? 'MessageDateSend' : ''}`}>{message.date}</span>
      </div>
      {message.author !== AUTHORS.HUMAN && <img className="MessageImg MessageImgRight" src={chatbot} alt="bot" />}
    </div>

  )
}