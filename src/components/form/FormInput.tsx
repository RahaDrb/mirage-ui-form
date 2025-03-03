import React, {ChangeEvent, MouseEvent} from 'react';
import Form from 'react-bootstrap/Form';
import {FormInputProps} from "../../common/interfaces";

function FormInput({
                       id,
                       label,
                       type,
                       ariaLabel,
                       value,
                       setValue,
                       modal,
                       setShow,
                       htmlFor,
                       placeholder,
                   }: FormInputProps): React.JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            if (type === 'checkbox' || type === 'radio') {
                setValue(e.target.checked, id?.toString());
            } else {
                setValue(e.target.value);
            }
        }
    };

    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
        if (modal && setShow) {
            setShow(true);
        }
    };

    if (type === 'checkbox' || type === 'radio') {
        return (
            <Form.Check
                id={id?.toString()}
                label={label ?? undefined}
                type={type}
                className={'option-check'}
                aria-label={ariaLabel}
                checked={value as boolean}
                onChange={handleChange}
            />
        );
    }

    return (
        <input
            onClick={handleClick}
            type={type}
            id={htmlFor?.toString()}
            className={`input-group input-element p-2 ${modal ? 'modal-input' : ''}`}
            autoComplete={'off'}
            placeholder={placeholder}
            value={value as string}
            onChange={handleChange}
        />
    );
}

export default FormInput;