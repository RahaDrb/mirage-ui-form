import React from 'react';

function Layout(props) {
    return (
        <div className={'main-layout-wrapper'}>
            <div
                className={'main-container d-flex flex-column align-items-center justify-content-center gap-4'}>
                <div className={'main-container-inner'}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
