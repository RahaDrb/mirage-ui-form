import OptionRow from "./OptionRow";
import {useDrag, useDrop} from 'react-dnd';

const ItemTypes = {
    ITEM: 'item',
};
export const RowItem = ({id, content, index, moveItem, item}) => {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        hover: (item, monitor) => {
            if (!item || item.id === id) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    return (
        <div
            ref={(node) => {
                drag(drop(node));
            }}
        >
            <OptionRow item={
                item
            }/>
        </div>
    );
};