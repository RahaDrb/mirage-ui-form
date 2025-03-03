import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useQuestionQuery from "../../queries/useQuestionStore";
import TypeSwitcher from "./TypeSwitcher";
import CommonButton from "../common/CommonButton";
import axios from "axios";
import {useUIStore} from "../../stores/useUIStore";
import {useErrorStore} from "../../stores/useErrorStore";

function QuestionDetails(props) {
    const {id} = useParams();
    const navigate = useNavigate();
    const {option, checkedArr} = useUIStore();
    const {setErrorId, setErrorMessage} = useErrorStore()
    // todo loading, err
    const {data, isLoading, error} = useQuestionQuery(id)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body;
            if (data?.question?.questionType !== 2) {
                if (!option) {
                    setErrorId(4)
                    setErrorMessage("Choose an option")
                    return
                }
                body = {
                    questionId: parseInt(id),
                    selectedChoiceId: option,
                }
            } else {
                if (checkedArr?.length < 1) {
                    setErrorId(4)
                    setErrorMessage("Choose an option")
                    return
                }
                body = {
                    questionId: parseInt(id),
                    selectedChoiceIds: checkedArr
                }
            }
            await axios.post('/api/responses', body);
            navigate('/');
        } catch (err) {
            console.error('Error submitting response:', err);
        }
    }
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
