import React, {JSX, useEffect} from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface CommonToastProps {
    error: string;
    className?: string;
    close: () => void;
}

function CommonToast({ error, className, close }: CommonToastProps): JSX.Element {
    useEffect(() => {
        const timerId = setTimeout(() => {
            close();
        }, 1000);

        return () => clearTimeout(timerId);
    }, [close]);

    return (
        <ToastContainer className={className ?? ''}>
            <Toast>
                <Toast.Body>{error}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default CommonToast;