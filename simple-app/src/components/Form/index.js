import React from 'react';
import { useRef, useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap'

export const FormChat = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value) {
            onSubmit(value);
        }
        setValue("");
        inputRef.current.focus();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" placeholder="Write your message..." value={value} onChange={handleChange} ref={inputRef} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Отправить
            </Button>
        </Form>
    )
}