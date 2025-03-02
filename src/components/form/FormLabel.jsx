import React from 'react';
import {useFormStore} from "../../stores/useFormStore";

function FormLabel(props) {
    return (
        <label onClick={() => {
            if (props.modal) {
                props.setShow(true)
            }
        }}
               htmlFor={props.htmlFor} className={'form-label form-label-text'}>{props.label}</label>
    );
}

export default FormLabel;
