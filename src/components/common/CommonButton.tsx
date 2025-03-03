import React, { MouseEventHandler } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface CommonButtonProps extends ButtonProps {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function CommonButton({ text, onClick, ...rest }: CommonButtonProps): React.JSX.Element {
    return (
        <Button
            onClick={onClick}
            {...rest}
        >
            {text}
        </Button>
    );
}

export default CommonButton;