import React from 'react';

interface SubmitErrorProps {
    text: string;
}

function SubmitError({text}: SubmitErrorProps) {
    return (
        <p className={'text-danger'}>{text}</p>
    );
}

export default SubmitError;
