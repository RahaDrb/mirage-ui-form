import React, {useEffect, useState} from 'react';
import FormBox from "./FormBox";
import FormButtons from "./FormButtons";
import axios from "axios";
import {useFormStore} from "../../stores/useFormStore";
import {useNavigate} from "react-router-dom";
import {checkEmptyString} from "../../functions/main";


function MainFormWrapper() {
    const {
        option, question, choices, resetForm,
        setErrorMessage, setErrorId
    } = useFormStore()
    const navigate = useNavigate();
    useEffect(() => {
        resetForm()
    }, [navigate])

    const handleSubmit = async (e, draft) => {
        if (!draft) {
            e.preventDefault();
        }
        if (checkEmptyString(question)) {
            setErrorMessage("Please fill in the question text")
            setErrorId(1)
            return
        }
        if (checkEmptyString(option)) {
            setErrorMessage("Please choose the question type")
            setErrorId(2)
            return
        }
        if (choices?.find(s => checkEmptyString(s.text))) {
            setErrorMessage("Please complete the options")
            setErrorId(2)
            return
        }
        try {
            const body = {
                questionText: question,
                questionType: option,
                choices: choices.map((q) => {
                    return {
                        checked: q.checked,
                        text: q.text,
                        order: q.order
                    }
                }),
            }
            const res = await axios.post('/api/questions', body);

            if (res.status < 300) {
                localStorage.setItem(`question-${res.data.question.id}`, JSON.stringify(res.data))
                if (draft) {
                    resetForm()
                } else {
                    navigate(`/questions/${res.data.question.id}`);
                }
            }
        } catch (error) {
            console.log(error, error.response.data.message)
        }
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}>
                <FormBox/>
                <FormButtons handleSubmit={handleSubmit}/>
            </form>
        </>
    );
}

export default MainFormWrapper;