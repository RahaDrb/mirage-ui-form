import React from 'react';
import { Plus } from 'react-feather';
import {defaultChoice, useFormStore} from '../../stores/useFormStore';

interface Choice {
    id: number;
    name: string;
    checked: boolean;
    order: number;
    text: string;
}

function AddOption(): React.JSX.Element {
    const { choices, setChoices } = useFormStore();

    const addOptionRow = () => {
        if (!choices || choices.length === 0) {
            setChoices([defaultChoice]);
            return;
        }
        let tmp = [...choices]
        const itemWithLargestOrder = choices.reduce((max, current) =>
            current.order > max.order ? current : max
        );

        const newChoice: Choice = {
            id: itemWithLargestOrder.order + 1,
            name: `Option ${itemWithLargestOrder.order + 1}`,
            checked: false,
            order: itemWithLargestOrder.order + 1,
            text: ''
        };

        setChoices([...tmp, newChoice]);
    };

    return (
        <div className={'px-2 py-3'}>
            <button
                type={'button'}
                className={'simple-button d-flex align-items-center justify-content-between px-0 add-option-button'}
                onClick={addOptionRow}
            >
                <Plus />
                <span>Add Option</span>
            </button>
        </div>
    );
}

export default AddOption;