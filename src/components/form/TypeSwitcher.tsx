import React, { useCallback } from 'react';
import AddOption from './AddOption';
import {useFormStore} from '../../stores/useFormStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RowItem } from './RowItem';
import {Choice} from "../../common/interfaces";

function TypeSwitcher(): React.JSX.Element {
    const { choices, setChoices } = useFormStore();

    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const prevChoices = [...choices];
            const draggedItem = prevChoices[dragIndex];
            const filteredChoices = prevChoices.filter((_, index) => index !== dragIndex);

            const newChoices = filteredChoices.reduce((result: Choice[], choice: Choice, index: number) => {
                if (index === hoverIndex) {
                    result.push(draggedItem);
                }
                result.push(choice);
                return result;
            }, []);

            if (hoverIndex === filteredChoices.length) {
                newChoices.push(draggedItem);
            }

            const updatedChoices = newChoices.map((choice: Choice, index: number) => ({
                ...choice,
                order: index + 1,
            }));

            setChoices(updatedChoices);
        },
        [choices, setChoices]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {choices?.map((choice: Choice, index: number) => (
                    <RowItem key={choice.id} id={choice.id} item={choice} index={index} moveItem={moveItem} />
                ))}
            </div>
            <AddOption />
        </DndProvider>
    );
}

export default TypeSwitcher;