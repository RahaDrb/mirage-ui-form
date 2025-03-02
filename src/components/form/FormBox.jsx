import React from 'react';
import FormHeader from "./FormHeader";
import FormInnerBox from "./FormInnerBox";
import FormModal from "./FormModal";

function FormBox(props) {
    return (
        <div className={'main-form-wrapper-inner'}>
            <FormHeader text={"Question"}/>
            <FormInnerBox/>
            <FormModal/>
        </div>
    );
}

export default FormBox;