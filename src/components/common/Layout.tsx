import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps): React.JSX.Element {
    return (
        <div className={'main-layout-wrapper'}>
            <div className={'main-container d-flex flex-column align-items-center justify-content-center gap-4'}>
                <div className={'main-container-inner'}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;