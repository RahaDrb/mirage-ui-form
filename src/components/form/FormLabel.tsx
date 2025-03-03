import React, { MouseEvent } from 'react';
import {FormLabelProps} from "../../common/interfaces";


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