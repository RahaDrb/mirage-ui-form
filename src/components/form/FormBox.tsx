import React from 'react';
import FormHeader from "./FormHeader";
import FormInnerBox from "./FormInnerBox";
import FormModal from "./FormModal";

function FormBox() {
    return (
        <div className={'main-layout-wrapper-inner mb-3'}>
            <FormHeader text={"Question"}/>
            <FormInnerBox/>
            <FormModal/>
        </div>
    );
}

export default FormBox;