import React, {useCallback} from 'react';
import OptionRow from './OptionRow'; // Assuming Item is OptionRow
import AddOption from './AddOption';
import {useFormStore} from '../../stores/useFormStore';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {RowItem} from "./RowItem";

function TypeSwitcher() {
    const {choices, setChoices} = useFormStore();
    const moveItem = useCallback((dragIndex, hoverIndex) => {
                let prevChoices = [...choices];
                const draggedItem = prevChoices[dragIndex];
                const filteredChoices = prevChoices.filter((_, index) => index !== dragIndex);

                const newChoices = filteredChoices.reduce((result, choice, index) => {
                    if (index === hoverIndex) {
                        result.push(draggedItem);
                    }
                    result.push(choice);
                    return result;
                }, []);

                if (hoverIndex === filteredChoices.length) {
                    newChoices.push(draggedItem);
                }

                const updatedChoices = newChoices.map((choice, index) => ({
                    ...choice,
                    order: index + 1,
                }));

                setChoices(updatedChoices)
            },
            [choices]
        )
    ;

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {choices?.map((choice, index) => (
                    <RowItem key={choice.id} id={choice.id} item={choice} index={index} moveItem={moveItem}/>
                ))}
            </div>
            <AddOption/>
        </DndProvider>
    );
}

export default TypeSwitcher;