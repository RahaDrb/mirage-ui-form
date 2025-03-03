import React, {MouseEventHandler, JSX} from 'react';
import CommonButton from '../common/CommonButton';

interface FormButtonsProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    secondaryText: string;
    primaryText: string;
}

function FormButtons({onClick, secondaryText, primaryText}: FormButtonsProps): JSX.Element {
    return (
        <div className={'form-buttons d-flex align-items-center justify-content-end gap-3'}>
            <CommonButton
                variant={'outline-secondary'}
                type={'button'}
                text={secondaryText}
                className={'form-submit-button'}
                onClick={onClick}
            />
            <CommonButton
                variant={'primary'}
                type={'submit'}
                text={primaryText}
                className={'form-submit-button'}
            />
        </div>
    );
}

export default FormButtons;