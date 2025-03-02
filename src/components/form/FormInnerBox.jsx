import React, {useEffect, useState} from 'react';
import FormGroup from "./FormGroup";
import {useFormStore} from "../../stores/useFormStore";
import TypeSwitcher from "./TypeSwitcher";

function FormInnerBox(props) {
    const {option, setOption, question, setQuestion, options} = useFormStore()
    const findOptionValue = () => {
        if (!option) {
            return {name: ''}
        }
        return options?.find(s => s.id === option)
    }
    return (
        <form className={'form-field-wrapper d-flex flex-column'}>
            <FormGroup label={'Question Text'} placeholder={'Enter Your Question'} htmlFor={'text'}
                       type={'text'}
                       value={question} setValue={setQuestion}
            />
            <FormGroup label={'Question Type'} placeholder={'Select an option'} htmlFor={'type'} modal
                       type={'text'}
                       value={findOptionValue()?.name}
            />
            {!!option ? (
                <TypeSwitcher type={props.type}/>
            ) : null}
        </form>
    );
}

export default FormInnerBox;