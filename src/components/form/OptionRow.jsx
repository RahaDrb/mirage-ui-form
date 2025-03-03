import React, {useCallback, useRef, useState} from 'react';
import {Menu} from "react-feather";
import FormInput from "./FormInput";
import DeleteOption from "./DeleteOption";
import {useFormStore} from "../../stores/useFormStore";


function OptionRow({item}) {
    const {choices, setChoices, option} = useFormStore()

    const editOption = (val, type) => {
        let tmp = [...choices];
        let ind = tmp.findIndex(s => s.id === item.id);
        switch (type) {
            case "checkbox":
                if(option === 2) {
                    tmp[ind].checked = val
                } else {
                    for (let i of tmp) {
                        let index = tmp.findIndex(s => s.id === i.id);
                        tmp[index].checked = false
                    }
                    tmp[ind].checked = val
                }
                break
            case "text":
                tmp[ind].text = val
                break
        }
        setChoices(tmp);
    }

    return (
        <div className={'mb-2 px-2 d-grid align-items-center options-grid'}
             >
            <div className={'option-sorter'}>
                <Menu className={'gray-col'}
                />
            </div>
            <div className={'option-checkbox'}>
                <FormInput type={'checkbox'}
                           value={item.checked}
                           setValue={(val) => editOption(val, 'checkbox')}
                           ariaLabel={`optionCheckbox`}
                />
            </div>
            <div className={'option-input'}>
                <FormInput placeholder={item.name} type={'text'}
                           value={item.text}
                           setValue={(val) => editOption(val, 'text')}
                           ariaLabel={`optionInput`}
                />
            </div>
            <DeleteOption idx={item.id}/>
        </div>
    );
}

export default OptionRow;