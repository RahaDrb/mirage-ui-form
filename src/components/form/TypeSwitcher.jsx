import React, {useRef} from 'react';
import OptionRow from "./OptionRow";
import AddOption from "./AddOption";
import {useFormStore} from "../../stores/useFormStore";

function TypeSwitcher(props) {
    const {choices} = useFormStore();

    return (
        <>
            <div>
                {choices?.sort((a, b) => a.order - b.order).map((choice) => (
                    <OptionRow key={choice.id} item={choice}
                               />
                ))}
            </div>
            <AddOption/>
        </>
    );
}

export default TypeSwitcher;
