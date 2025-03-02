import React from 'react';
import FormBox from "./FormBox";
import FormButtons from "./FormButtons";

function MainFormWrapper(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className={'main-form-wrapper'}>
            <form
                onSubmit={handleSubmit}
                className={'form-container d-flex flex-column align-items-center justify-content-center gap-4'}>
                <FormBox/>
                <FormButtons/>
            </form>
        </div>
    );
}

export default MainFormWrapper;