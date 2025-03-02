import React from 'react';
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import {useFormStore} from "../../stores/useFormStore";

function FormGroup(props) {
    const {setShow} = useFormStore()

    return (
        <div className={'mb-3'}>
            <FormLabel label={props.label} htmlFor={props.htmlFor} modal={props.modal} setShow={setShow}/>
            <FormInput placeholder={props.placeholder} htmlFor={props.htmlFor} type={props.type}
                       value={props.value}
                       setValue={props.setValue}
                       modal={props.modal}
                       setShow={setShow}
            />
        </div>
    );
}

export default FormGroup;