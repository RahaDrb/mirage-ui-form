import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useQuestionQuery from '../../queries/useQuestionStore';
import TypeSwitcher from './TypeSwitcher';
import CommonButton from '../common/CommonButton';
import axios from 'axios';
import {useUIStore} from '../../stores/useUIStore';
import {useErrorStore} from '../../stores/useErrorStore';
import {checkEmptyString} from '../../functions/main';
import CommonToast from '../common/CommonToast';
import Loading from "../common/Loading";
import FormButtons from "../form/FormButtons";

function QuestionDetails(): React.JSX.Element {
    const {id} = useParams();
    const navigate = useNavigate();
    const {option, checkedArr} = useUIStore();
    const {setErrorId, setErrorMessage} = useErrorStore();
    const [toastMsg, setToastMsg] = useState<string>('');
    const [fetch, setFetch] = useState(false)
    const {data, isLoading, error} = useQuestionQuery(id, fetch);
    useEffect(() => {
        setFetch(true)
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let body: any;
            if (data?.question?.questionType !== 2) {
                if (!option) {
                    setErrorId(4);
                    setErrorMessage('Choose an option');
                    return;
                }
                body = {
                    questionId: id,
                    selectedChoiceId: option,
                };
            } else {
                if (!checkedArr || checkedArr.length < 1) {
                    setErrorId(4);
                    setErrorMessage('Choose an option');
                    return;
                }
                body = {
                    questionId: parseInt(id as string),
                    selectedChoiceIds: checkedArr,
                };
            }
            await axios.post('/api/responses', body);
            navigate('/');
        } catch (err: any) {
            console.error('Error submitting response:', err);
            setErrorMessage('Error submitting response');
        }
    };

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <CommonToast error={"Error"} close={() => {
        }} className="mt-3"/>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={'main-layout-wrapper-inner mb-3'}>
                    <h4>{data?.question?.questionText}</h4>
                    <TypeSwitcher data={data}/>
                </div>
                <FormButtons
                    primaryText={'Save'}
                    secondaryText={'Back'}
                    onClick={() => {
                        navigate(`/question/${id}`)
                    }}/>
            </form>
            {checkEmptyString(toastMsg) ? null : (
                <CommonToast error={toastMsg} close={() => setToastMsg('')} className="mt-3"/>
            )}
        </>
    );
}

export default QuestionDetails;