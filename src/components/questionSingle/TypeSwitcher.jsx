import React, {useEffect} from 'react';
import FormSelect from "../form/FormSelect";
import {useUIStore} from "../../stores/useUIStore";

function TypeSwitcher(props) {
    const {option, setOption} = useUIStore();
    const findDefault = () => {
        return props?.data?.question?.choices.find(s => s.checked)
    }
    useEffect(() => {
        if (props.data?.question?.questionType !== 2) {
            setOption(findDefault()?.id);
        }
    }, [props.data])
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
                return (<></>)
            case 3:
                return (<></>)
            default:
                return null
        }
    }
    return (switchType());
}

export default TypeSwitcher;
