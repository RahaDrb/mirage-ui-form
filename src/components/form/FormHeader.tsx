import React from 'react';

interface HeaderProps {
    text: string;
}

function FormHeader({text}: HeaderProps) {
    return (
        <h1 className={'main-layout-header'}>{text}</h1>
    );
}

export default FormHeader;