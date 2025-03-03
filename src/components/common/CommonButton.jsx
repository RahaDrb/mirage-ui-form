import React from 'react';
import {Button} from "react-bootstrap";

function CommonButton(props) {
    return (
        <Button
            variant={props.variant}
            onClick={props.onClick ? (e) => props.onClick(e) : undefined}
            type={props.type}
            className={props.className ?? ""}
        >
            {props.text}
        </Button>
    );
}

export default CommonButton;