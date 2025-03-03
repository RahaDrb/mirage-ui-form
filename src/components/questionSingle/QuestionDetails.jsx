import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useQuestionQuery from "../../queries/useQuestionStore";
import TypeSwitcher from "./TypeSwitcher";
import CommonButton from "../common/CommonButton";

function QuestionDetails(props) {
    const {id} = useParams();
    const {data, isLoading, error} = useQuestionQuery(id)
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <form onSubmit={handleSubmit}>
            <div className={'main-layout-wrapper-inner mb-3'}>
                <h4>{data?.question?.questionText}</h4>
                <TypeSwitcher data={data}/>
            </div>
            <div className={'form-buttons d-flex align-items-center justify-content-end gap-3'}>
                <CommonButton text={'Submit'}
                              variant={'primary'}
                              type={'submit'}
                />
            </div>
        </form>
    );
}

export default QuestionDetails;
