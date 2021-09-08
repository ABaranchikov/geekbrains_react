import React from 'react';
import './Message.scss';

export const Message = (props) => {
    return (
        <li>
        <div className={`MessageData ${props.message.author === 'HUMAN' ? '' : 'AlignRight' }`}>
          <span className="MessageDataName">{props.message.author}</span>
          <span className="MessageDataTime">{props.message.date}</span>
        </div>
        <div className={`Message ${props.message.author === 'HUMAN' ? 'MyMessage' : 'OtherMessage FloatRight' }`}>
         {props.message.text}
        </div>
      </li>
    )
}