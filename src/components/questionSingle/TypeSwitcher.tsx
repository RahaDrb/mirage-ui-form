import React, {JSX, useEffect} from 'react';
import FormSelect from '../form/FormSelect';
import { useUIStore } from '../../stores/useUIStore';
import FormInput from '../form/FormInput';
import SubmitError from '../common/SubmitError';
import { useErrorStore } from '../../stores/useErrorStore';
import {Choice} from "../../stores/useFormStore";


interface QuestionData {
    question: {
        questionType: number;
        choices: Choice[];
    };
}

interface TypeSwitcherProps {
    data: QuestionData | undefined | null;
}

function TypeSwitcher({ data }: TypeSwitcherProps): JSX.Element {
    const { option, setOption, checkedArr, setCheckedArr } = useUIStore();
    const { errorId, errorMessage, resetErrors } = useErrorStore();

    const findDefault = (multiple: boolean = false): number | number[] | undefined => {
        if (!data?.question?.choices) return undefined;

        if (multiple) {
            return data.question.choices.filter((s) => s.checked).map((v) => v.id);
        }
        return data.question.choices.find((s) => s.checked)?.id;
    };

    useEffect(() => {
        if (!data?.question?.questionType) return;
        switch (data.question.questionType) {
            case 1:
            case 3:
                setOption(findDefault() as number);
                break;
            case 2:
                setCheckedArr(findDefault(true) as number[]);
                break;
            default:
                break;
        }
    }, [data, setOption, setCheckedArr]);

    const handleChosen = (val: string | boolean, id?: number | string) => {
        setOption(Number(id));
        resetErrors();
    };

    const handleCheckedItems = (val: string | boolean, id?: string) => {
        let tmp = [...checkedArr];
        const idx = Number(id)
        let ind = tmp.indexOf(idx);
        if (ind === -1) {
            if (val) {
                tmp = [...tmp, idx];
            }
        } else {
            tmp = tmp.filter((s) => s !== idx);
        }
        resetErrors();
        setCheckedArr(tmp);
    };

    const switchType = (): JSX.Element | JSX.Element[] | null => {
        if (!data?.question?.questionType) return null;
        switch (data.question.questionType) {
            case 1:
                return (
                    <FormSelect
                        options={data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => ({
                            id: c.id,
                            name: c.text,
                        }))}
                        value={option}
                        onChange={setOption}
                    />
                );
            case 2:
                return data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => (
                    <FormInput
                        key={c.id}
                        htmlFor={c.id.toString()}
                        id={c.id.toString()}
                        type={'checkbox'}
                        label={c.text}
                        value={checkedArr?.includes(c.id)}
                        setValue={handleCheckedItems}
                    />
                ));
            case 3:
                return data.question.choices?.sort((a, b) => a.order - b.order)?.map((c) => (
                    <FormInput
                        key={c.id}
                        htmlFor={c.id.toString()}
                        id={c.id.toString()}
                        type={'radio'}
                        label={c.text}
                        className={'d-flex flex-column'}
                        value={option === c.id}
                        setValue={handleChosen}
                    />
                ));
            default:
                return null;
        }
    };

    return (
        <>
            {switchType()}
            {!!errorId && errorId === 4 ? <SubmitError text={errorMessage} /> : null}
        </>
    );
}

export default TypeSwitcher;