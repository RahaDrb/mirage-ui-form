import React from 'react';
import Form from 'react-bootstrap/Form';

function FormInput(props) {

    if (props?.type === 'checkbox' || props?.type === 'radio') {
        return (
            <Form.Check
                id={props.id}
                label={props.label ?? undefined}
                type={props.type} className={'option-check'} aria-label={props.ariaLabel}
                checked={props.value} value={props.value} onChange={e => {
                props.setValue(e.target.checked, props.id);
            }}/>
        )
    }
    return (
        <input
            onClick={() => {
                if (props.modal) {
                    props.setShow(true)
                }
            }}
            type={props.type}
            id={props.htmlFor} className={`input-group input-element p-2 ${props.modal ? "modal-input" : ""}`}
            autoComplete={'off'}
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => {
                props.setValue && props.setValue(e.target.value);
            }}
        />
    );
}

export default FormInput;
