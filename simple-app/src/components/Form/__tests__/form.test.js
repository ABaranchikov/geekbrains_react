import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormChat } from '..';

describe('form tests', () => {

    it("should render the basic fields", () => {
        render(<FormChat />);
        expect(screen.getByPlaceholderText(/Write your message/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Отправить/i })).toBeInTheDocument();
    });

    it('form submit test', () => {
        const onSubmitFn = jest.fn();
        const component = render(<FormChat onSubmit={onSubmitFn} />);

        fireEvent.change(screen.getByPlaceholderText(/Write your message/i), { target: { value: 'Joe Doe' } }); // invoke handleChange
        fireEvent.submit(screen.getByTestId("form"));
    
        expect(onSubmitFn).toHaveBeenCalled(); // Test if handleSubmit has been called 
        expect(onSubmitFn.mock.calls).toEqual([['Joe Doe']]); 
    });

});