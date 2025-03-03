import React, {useEffect} from 'react';
import FormSelect from "../form/FormSelect";
import {useUIStore} from "../../stores/useUIStore";
import FormInput from "../form/FormInput";
import SubmitError from "../common/SubmitError";
import {useErrorStore} from "../../stores/useErrorStore";

function TypeSwitcher(props) {
    const {option, setOption, checkedArr, setCheckedArr} = useUIStore();
    const {errorId, errorMessage, resetErrors} = useErrorStore();
    const findDefault = (arr) => {
        if (arr) {
            return props?.data?.question?.choices.filter(s => s.checked)?.map(v => v.id)
        }
        return props?.data?.question?.choices.find(s => s.checked)
    }
    useEffect(() => {
        switch (props.data?.question?.questionType) {
            case 1:
            case 3:
                setOption(findDefault()?.id);
                break
            case 2:
                setCheckedArr(findDefault(true));
                break
        }
    }, [props.data])
    const handleChosen = (val, id) => {
        setOption(id)
        resetErrors()
    }
    const handleCheckedItems = (val, id) => {
        let tmp = [...checkedArr]
        let ind = tmp.indexOf(id)
        if (ind === -1) {
            if (val) {
                tmp = [...tmp, id]
            }
        } else {
            tmp = tmp.filter(s => s !== id)
        }
        resetErrors()
        setCheckedArr(tmp)
    }
    const switchType = () => {
        if (!props.data?.question?.questionType) return null
        switch (props.data?.question?.questionType) {
            case 1:
                return (
                    <FormSelect options={props.data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => {
                        return {
                            id: c.id, name: c.text
                        }
                    })}
                                value={option}
                                onChange={setOption}/>)
            case 2:
                return (
                    props.data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => (
                        <FormInput
                            key={c.id}
                            htmlFor={c.id}
                            id={c.id}
                            type={'checkbox'}
                            label={c.text}
                            value={checkedArr?.find(h => h === c.id)}
                            setValue={handleCheckedItems}
                        />
                    ))
                )
            case 3:
                return (
                    props.data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => (
                        <FormInput
                            key={c.id}
                            htmlFor={c.id}
                            id={c.id}
                            type={'radio'}
                            label={c.text}
                            className={'d-flex flex-column'}
                            value={option === c.id}
                            setValue={handleChosen}
                        />
                    ))
                )
            default:
                return null
        }
    }
    return (
        <>{switchType()}
            {!!errorId && errorId === 4 ? (
                <SubmitError text={errorMessage}/>
            ) : null}
        </>
    );
}

export default TypeSwitcher;
