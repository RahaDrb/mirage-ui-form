import React from 'react';
import {X} from 'react-feather';
import {useFormStore} from '../../stores/useFormStore';
import {useErrorStore} from "../../stores/useErrorStore";

interface DeleteOptionProps {
    idx: number;
}

function DeleteOption({idx}: DeleteOptionProps): React.JSX.Element {
    const {choices, setChoices} = useFormStore();
    const {setErrorMessage, setErrorId} = useErrorStore()
    const deleteOption = () => {
        if (choices?.length < 2) {
            setErrorMessage('Cannot delete first option');
            setErrorId(2);
            return
        }
        const updatedChoices = choices.filter((choice) => choice.id !== idx);
        setChoices(updatedChoices);
    };

    return (
        <div
            className={'option-delete d-flex align-items-center justify-content-end'}
            onClick={deleteOption}
        >
            <X className={'err-col'}/>
        </div>
    );
}

export default DeleteOption;