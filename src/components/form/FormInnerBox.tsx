import React, {useEffect} from 'react';
import FormGroup from "./FormGroup";
import {useFormStore} from "../../stores/useFormStore";
import TypeSwitcher from "./TypeSwitcher";
import {useErrorStore} from "../../stores/useErrorStore";

function FormInnerBox() {
    const {
        option, question, setQuestion, show, options,
        choices
    } = useFormStore()
    const {resetErrors} = useErrorStore()
    useEffect(() => {
        resetErrors()
    }, [question, option, choices]);
    const findOptionValue = () => {
        if (!option) {
            return ''
        }
        let tmp = [...options]
        return tmp?.find((s: { id: string }) => Number(s.id) === option)?.name ?? ""
    }
    return (
        <div className={'form-field-wrapper d-flex flex-column'}>
            <FormGroup label={'Question Text'} placeholder={'Enter Your Question'} htmlFor={'text'}
                       type={'text'}
                       value={question} setValue={val => setQuestion(val.toString())}
                       id={1}
            />
            <FormGroup label={'Question Type'} placeholder={'Select an option'} htmlFor={'type'} modal
                       type={'text'}
                       value={findOptionValue()}
                       id={2}
            />
            {!!option ? (
                <TypeSwitcher/>
            ) : null}
        </div>
    );
}

export default FormInnerBox;