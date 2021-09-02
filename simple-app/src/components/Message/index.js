import React from 'react';
import './Message.scss';

export const Message = (props) => {
    return (
        <h3 className="MessageHeader">Message: <span className="MessageText">{ props.text }</span></h3>
    )
}