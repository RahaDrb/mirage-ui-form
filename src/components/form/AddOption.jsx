import React from 'react';
import {Plus} from "react-feather";
import {useFormStore} from "../../stores/useFormStore";

function AddOption() {
    const {choices, setChoices} = useFormStore();
    const itemWithLargestOrder = choices.reduce((max, current) =>
        current.order > max.order ? current : max
    );
    const addOptionRow = () => {
        let tmp = [...choices];
        tmp = [...tmp, {
            id: itemWithLargestOrder.order + 1,
            name: `Option ${itemWithLargestOrder.order + 1}`,
            checked: false,
            order: itemWithLargestOrder.order + 1,
        }]
        setChoices(tmp);
    }
    return (
        <div className={'px-2 py-3'}>
            <button type={'button'} className={'simple-button d-flex align-items-center justify-content-between px-0 add-option-button'}
                    onClick={() => addOptionRow()}
            >
                <Plus/>
                <span>Add Option</span>
            </button>
        </div>
    );
}

export default AddOption;