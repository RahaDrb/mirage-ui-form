import React from 'react';
import {X} from "react-feather";
import {useFormStore} from "../../stores/useFormStore";

function DeleteOption({idx}) {
    const {choices, setChoices} = useFormStore();
    const deleteOption = () => {
        let tmp = [...choices];
        tmp = tmp.filter(s => s.id !== idx);
        setChoices(tmp);
    }
    return (
        <div className={'option-delete d-flex align-items-center justify-content-end'}
             onClick={() => deleteOption()}>
            <X className={'err-col'}/>
        </div>
    );
}

export default DeleteOption;
