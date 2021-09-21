import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react';

export const ChatsForm = ({ onAddChat }) => {
    const [value, setValue] = useState("");
    const handleChange = (event) => setValue(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value) {
            onAddChat(value);
        }
        setValue("");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="FormChat">
                <Form.Control type="text" value={value} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" className="FormChatBtn" type="submit">
                Добавить чат
            </Button>
        </Form>
    )
    
}