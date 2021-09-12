import React from 'react';
import './Message.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import chatbot from '../../img/chatbot.jpg';

export const Message = (props) => {
  return (
    <div className={`d-flex ${props.message.author === 'HUMAN' ? 'justify-content-start ' : 'justify-content-end '} m-0 p-0 mb-4 pt-10`}>
      {props.message.author === 'HUMAN' && <img className="MessageImg" src="http://emilcarlsson.se/assets/mikeross.png" alt="" />}

      <div className={`MessageContainer ${props.message.author === 'HUMAN' ? 'SendTxt' : 'RepliesTxt'}`} >
        <p className="MessageTxt"> {props.message.text}</p>
        <span className={`MessageDate ${props.message.author === 'HUMAN' ? 'MessageDateSend' : ''}`}>{props.message.date}</span>
      </div>

      {props.message.author !== 'HUMAN' && <img className="MessageImg MessageImgRight" src={chatbot} alt="bot" />}

    </div>

  )
}

