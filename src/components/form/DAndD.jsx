import React, { useState, useRef } from 'react';

function DAndD() {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const draggedItemIndex = useRef(null);
    const draggedOverItemIndex = useRef(null);
    const handleDragStart = (e, index) => {
        draggedItemIndex.current = index;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(index)); // Use plain text and the index
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedIndex = Number(e.dataTransfer.getData('text/plain')); // Retrieve the index
        if (droppedIndex === draggedOverItemIndex.current) {
            return;
        }

        const newItems = [...items];
        const draggedItem = newItems[droppedIndex];
        newItems.splice(droppedIndex, 1);
        newItems.splice(draggedOverItemIndex.current, 0, draggedItem);

        setItems(newItems);
        draggedItemIndex.current = null;
        draggedOverItemIndex.current = null;
    };
    const handleDragOver = (e, index) => {
        e.preventDefault();
        draggedOverItemIndex.current = index;
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
    };

    const handleDragLeave = (e, index) => {
        //Optional: Add visual feedback for leaving a drop zone.
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Drag and Drop Items</h2>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    minWidth: '200px',
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragLeave={(e) => handleDragLeave(e,index)}
                        onDrop={handleDrop}
                        style={{
                            border: '1px solid #eee',
                            padding: '8px',
                            margin: '4px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'move',
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DAndD;