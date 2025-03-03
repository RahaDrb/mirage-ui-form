import React from 'react';
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import {useFormStore} from "../../stores/useFormStore";
import SubmitError from "../common/SubmitError";
import {checkEmptyString} from "../../functions/main";

function FormGroup(props) {
    const {setShow, errorMessage, errorId} = useFormStore()

    return (
        <div className={'mb-3'}>
            <FormLabel label={props.label} htmlFor={props.htmlFor} modal={props.modal} setShow={setShow}/>
            <FormInput placeholder={props.placeholder} htmlFor={props.htmlFor} type={props.type}
                       value={props.value}
                       setValue={props.setValue}
                       modal={props.modal}
                       setShow={setShow}
            />
            {!!errorId && errorId === props.id ? (
                <SubmitError text={errorMessage}/>
            ) : null}
        </div>
    );
}

export default FormGroup;