import React from 'react';
import {Button} from "react-bootstrap";

function CommonButton(props) {
    return (
        <Button
            variant={props.variant}
            onClick={props.onClick ? () => props.onClick() : undefined}
            type={props.type}
            className={props.className ?? ""}
        >
            {props.text}
        </Button>
    );
}

export default CommonButton;