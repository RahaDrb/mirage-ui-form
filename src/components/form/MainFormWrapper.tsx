import React, {FormEvent, useEffect, useState} from 'react';
import FormBox from "./FormBox";
import FormButtons from "./FormButtons";
import axios, {AxiosResponse} from "axios";
import {defaultChoice, useFormStore} from "../../stores/useFormStore";
import {useNavigate, useParams} from "react-router-dom";
import {checkEmptyString} from "../../functions/main";
import {useErrorStore} from "../../stores/useErrorStore";
import CommonToast from "../common/CommonToast";
import {ApiResponse, Choice, QuestionData} from "../../common/interfaces";
import useQuestionQuery from "../../queries/useQuestionStore";
import Loading from "../common/Loading";
import useTypesQuery from "../../queries/useTypesQuery";

function MainFormWrapper() {
    const {id} = useParams()
    const {
        option, question, choices, resetForm, setChoices, setQuestion, setOptions,
        setOption
    } = useFormStore()

    const {setErrorMessage, errorId, setErrorId, resetErrors} = useErrorStore();
    const {data, isLoading, error} = useQuestionQuery(id);

    const navigate = useNavigate();

    const {data: typesData, isLoading: typesLoading, error: typesError} = useTypesQuery();

    useEffect(() => {
        if (typesLoading || typesError || !typesData) return;
        if (!id) {
            setChoices([defaultChoice])
            resetErrors()
            resetForm()
            setOptions(typesData.questionTypes);
        } else {
            if (isLoading || error || !data) return
            resetErrors()
            resetForm()
            setOptions(typesData.questionTypes);

            if (data?.question) {
                setQuestion(data.question.questionText)
                setChoices(data.question.choices)
                setOption(Number(data.question.questionType))
            }
        }
    }, [navigate, id, data, isLoading, error, typesData, typesLoading, typesError])
    const [toastMsg, setToastMsg] = useState('')
    const submit = async (draft: boolean) => {
        if (checkEmptyString(question)) {
            setErrorMessage('Please fill in the question text');
            setErrorId(1);
            return;
        }
        if (!option || option === 0) {
            setErrorMessage('Please choose the question type');
            setErrorId(2);
            return;
        }
        if (choices?.find((s: Choice) => checkEmptyString(s.text))) {
            setErrorMessage('Please complete the options');
            setErrorId(2);
            return;
        }
        try {
            const body: QuestionData = {
                questionText: question,
                questionType: option,
                choices: choices.map((q: Choice) => ({
                    checked: q.checked,
                    text: q.text,
                    order: q.order,
                })),
            };
            let res: AxiosResponse<ApiResponse>;
            if(!!id) {
                res = await axios.put(`/api/questions/${id}`, body);
                if(res.status < 300) {
                    if (draft) {
                        setToastMsg('Question successfully drafted');
                        navigate(`/`);
                    } else {
                        navigate(`/questions/${id}`);
                    }
                }
            } else {
                res = await axios.post('/api/questions', body);
                if (res.status < 300) {
                    // localStorage.setItem(`question-${res.data.question.id}`, JSON.stringify(res.data));
                    if (draft) {
                        setToastMsg('Question successfully drafted');
                        resetForm();
                    } else {
                        navigate(`/questions/${res.data.question.id}`);
                    }
                }
            }
        } catch (error: any) {
            console.error(error, error?.response?.data?.message);
            setToastMsg(error?.response?.data?.message);
        }
    }
    const handleDraft = async () => {
        await submit(true)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submit(false)
    };
    if (!!id && isLoading) {
        return <Loading/>;
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}>
                <FormBox/>
                <FormButtons
                    secondaryText={'Save as draft'}
                    primaryText={'Continue'}
                    onClick={handleDraft}/>
            </form>
            {!!errorId && !checkEmptyString(toastMsg) ?
                <CommonToast error={toastMsg} close={() => setToastMsg('')} className="mt-3"/>
                : null
            }
        </>
    );
}

export default MainFormWrapper;