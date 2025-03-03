import React from 'react';
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import {useFormStore} from "../../stores/useFormStore";
import SubmitError from "../common/SubmitError";
import {useErrorStore} from "../../stores/useErrorStore";
interface FormGroupProps {
    label: string;
    htmlFor: string | number;
    placeholder?: string;
    type: string;
    value: string | boolean;
    setValue?: (value: string | boolean, id?: number | string) => void;
    modal?: boolean;
    id?: number | string;
}
function FormGroup(props: FormGroupProps) {
    const {setShow} = useFormStore()
    const {errorMessage, errorId} = useErrorStore()

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