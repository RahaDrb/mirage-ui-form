import React, { useRef } from 'react';
import OptionRow from './OptionRow';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

const ItemTypes = {
    ITEM: 'item',
};

interface RowItemProps {
    id?: number;
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    item: any;
}

export const RowItem = ({ id, index, moveItem, item }: RowItemProps): React.JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        hover: (draggedItem: { id: number; index: number }, monitor) => {
            if (!draggedItem || draggedItem.id === id) {
                return;
            }
            const dragIndex = draggedItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        },
    });

    drag(drop(ref));

    if(!id) return <></>
    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <OptionRow item={item} />
        </div>
    );
};