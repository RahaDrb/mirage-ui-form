import React from 'react';
import CommonButton from "../common/CommonButton";

function FormButtons(props) {
    return (
        <div className={'form-buttons d-flex align-items-center justify-content-end gap-3'}>
            <CommonButton
                variant={'outline-secondary'}
                type={'button'}
                text={'Save as Draft'}
                className={'form-submit-button'}
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