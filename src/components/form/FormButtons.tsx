import React, {MouseEventHandler, JSX} from 'react';
import CommonButton from '../common/CommonButton';

interface FormButtonsProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function FormButtons({onClick}: FormButtonsProps): JSX.Element {
    return (
        <div className={'form-buttons d-flex align-items-center justify-content-end gap-3'}>
            <CommonButton
                variant={'outline-secondary'}
                type={'button'}
                text={'Save as Draft'}
                className={'form-submit-button'}
                onClick={onClick}
            />
            <CommonButton
                variant={'primary'}
                type={'submit'}
                text={'Continue'}
                className={'form-submit-button'}
            />
        </div>
    );
}

export default FormButtons;