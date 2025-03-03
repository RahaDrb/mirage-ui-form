import React, { MouseEvent } from 'react';

interface FormLabelProps {
    label: string;
    htmlFor: string | number;
    modal?: boolean;
    setShow?: (value: boolean) => void;
}

function FormLabel({ label, htmlFor, modal, setShow }: FormLabelProps): React.JSX.Element {
    const handleClick = (event: MouseEvent<HTMLLabelElement>) => {
        if (modal && setShow) {
            setShow(true);
        }
    };

    return (
        <label
            onClick={handleClick}
            htmlFor={htmlFor.toString()}
            className={'form-label form-label-text'}
        >
            {label}
        </label>
    );
}

export default FormLabel;